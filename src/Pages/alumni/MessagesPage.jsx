import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Bell, Check, ChevronDown, MessageSquare, MoreVertical, Paperclip, Search, Send, Settings, X } from "lucide-react";
import { messagingAPI } from "../../services/api";
import usePageTitle from "../../hooks/usePageTitle";
import { useAuth } from "../../context/AuthContext";

const initials = (person) => `${person?.firstName?.[0] || ""}${person?.lastName?.[0] || ""}`.toUpperCase() || "?";
const displayName = (person) => {
  const fullName = `${person?.firstName || ""} ${person?.lastName || ""}`.trim();
  if (fullName) return fullName;
  if (person?.role === "admin" || person?.role === "superadmin") return "Admin Team";
  return "Alumni";
};
const formatDate = (value) => value ? new Date(value).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "";

const Avatar = ({ person, online }) => <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#d9c0ea] text-sm font-semibold text-[#4c216e]">{initials(person)}{online && <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />}</span>;

const MessagesPage = () => {
  usePageTitle("Messages");
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [selected, setSelected] = useState(null);
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");
  const [draft, setDraft] = useState("");
  const [recipientId, setRecipientId] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [settings, setSettings] = useState({ showOnlineStatus: true, readReceipts: true, messageNotifications: true });
  const [showSettings, setShowSettings] = useState(false);
  const [showComposer, setShowComposer] = useState(false);
  const [presence, setPresence] = useState({});
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();

  const [contactList, setContactList] = useState([]);
  const people = useMemo(() => {
    const map = new Map();
    [...contactList, ...conversations.flatMap((conversation) => conversation.participants || [])].forEach((person) => {
      if (person?._id) map.set(String(person._id), person);
    });
    return [...map.values()];
  }, [contactList, conversations]);
  const filtered = conversations.filter((conversation) => conversation.participants?.some((person) => displayName(person).toLowerCase().includes(search.toLowerCase())));
  const currentUserId = user?._id || user?.id;
  const otherPerson = (conversation) => conversation?.participants?.find((person) => String(person._id) !== String(currentUserId)) || conversation?.participants?.[0];

  const loadContacts = async () => {
    try {
      const response = await messagingAPI.getContacts();
      setContactList(response.data.contacts || []);
      const ids = (response.data.contacts || []).map((person) => person._id);
      if (ids.length) {
        const status = await messagingAPI.getPresence(ids);
        setPresence(Object.fromEntries((status.data.presence || []).map((item) => [String(item.alumniId), item])));
      }
    } catch (requestError) { setError(requestError.response?.data?.message || "Unable to load contacts"); }
  };

  const loadConversations = async () => {
    try {
      const response = await messagingAPI.getConversations();
      setConversations(response.data.conversations || []);
      const ids = (response.data.conversations || []).flatMap((conversation) => conversation.participants || []).map((person) => String(person._id));
      if (ids.length) {
        const status = await messagingAPI.getPresence(ids);
        setPresence((previous) => ({ ...previous, ...Object.fromEntries((status.data.presence || []).map((item) => [String(item.alumniId), item])) }));
      }
    } catch (requestError) { setError(requestError.response?.data?.message || "Unable to load messages"); }
  };
  const loadSettings = async () => { try { const response = await messagingAPI.getSettings(); setSettings(response.data.settings); } catch { setError("Unable to load message settings"); } };
  const loadMessages = async (conversation) => {
    setSelected(conversation);
    try { const response = await messagingAPI.getMessages(conversation._id); setMessages(response.data.messages || []); await messagingAPI.markRead(conversation._id); } catch (requestError) { setError(requestError.response?.data?.message || "Unable to load conversation"); }
  };
  useEffect(() => { loadContacts(); loadConversations(); loadSettings(); messagingAPI.heartbeat().catch(() => {}); const timer = window.setInterval(() => { loadContacts(); loadConversations(); messagingAPI.heartbeat().catch(() => {}); }, 15000); return () => window.clearInterval(timer); }, []);
  useEffect(() => { const recipient = searchParams.get("recipientId"); if (recipient) { setRecipientId(recipient); setRecipientName(searchParams.get("recipientName") || ""); setShowComposer(true); } }, [searchParams]);
  useEffect(() => { if (!selected) return undefined; const timer = window.setInterval(() => loadMessages(selected), 10000); return () => window.clearInterval(timer); }, [selected]);

  const send = async () => { if (!selected || !draft.trim()) return; try { await messagingAPI.sendMessage(selected._id, draft); setDraft(""); await loadMessages(selected); await loadConversations(); } catch (requestError) { setError(requestError.response?.data?.message || "Unable to send message"); } };
  const startConversation = async () => { if (!recipientId) return; try { const response = await messagingAPI.createConversation(recipientId); setShowComposer(false); await loadConversations(); await loadMessages(response.data.conversation); } catch (requestError) { setError(requestError.response?.data?.message || "Unable to start conversation"); } };
  const saveSettings = async (key, value) => { const next = { ...settings, [key]: value }; setSettings(next); try { await messagingAPI.updateSettings(next); } catch { setError("Unable to save settings"); } };

  const selectedRecipientIsListed = people.some((person) => String(person._id) === String(recipientId));
  return <div className="min-h-screen bg-[#f7f7f8] px-4 py-8 sm:px-8"><div className="mx-auto max-w-6xl"><div className="mb-4 flex items-center justify-between"><h1 className="text-2xl font-semibold text-slate-900">Messages</h1><div className="flex gap-2"><button title="Message settings" onClick={() => setShowSettings(true)} className="border border-slate-300 bg-white p-2 text-slate-700"><Settings size={18} /></button><button onClick={() => setShowComposer(true)} className="bg-[#ba3439] px-5 py-2.5 text-sm font-semibold text-white shadow-sm">SEND NEW MESSAGE</button></div></div>{error && <div className="mb-3 flex justify-between bg-red-50 px-4 py-3 text-sm text-red-700">{error}<button onClick={() => setError("")}><X size={16} /></button></div>}<div className="grid min-h-[620px] grid-cols-1 overflow-hidden border border-slate-200 bg-white shadow-sm lg:grid-cols-[360px_1fr]"><aside className="border-r border-slate-200 bg-[#fafafa]"><div className="flex items-center justify-between border-b border-slate-200 px-5 py-5"><h2 className="text-xl font-medium">Chats</h2><div className="flex gap-3 text-slate-700"><button onClick={() => setShowSettings(true)} title="Settings"><Settings size={19} /></button><Search size={19} /></div></div><div className="border-b border-slate-200 px-4 py-3"><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search chats" className="w-full border-b border-slate-300 bg-transparent px-1 py-2 text-sm outline-none focus:border-[#344579]" /></div><div>{filtered.map((conversation) => { const person = conversation.participants?.[0]; return <button key={conversation._id} onClick={() => loadMessages(conversation)} className={`flex w-full items-center gap-3 border-b border-slate-100 px-5 py-4 text-left hover:bg-slate-100 ${selected?._id === conversation._id ? "bg-slate-100" : ""}`}><Avatar person={person} online={presence[person?._id]?.online} /><span className="min-w-0 flex-1"><strong className="block truncate text-sm text-slate-900">{displayName(person)}</strong><span className="block truncate text-xs text-slate-500">You: {conversation.lastMessage || "Start a conversation"}</span></span><span className="self-start text-xs text-slate-500">{formatDate(conversation.lastMessageAt)}</span></button>; })}</div>{filtered.length === 0 && <p className="p-8 text-center text-sm text-slate-500">No conversations yet.</p>}</aside><main className="relative flex min-h-[620px] flex-col">{selected ? <><div className="flex items-center justify-between border-b border-slate-200 px-6 py-4"><div className="flex items-center gap-3"><Avatar person={otherPerson(selected)} online={presence[otherPerson(selected)?._id]?.online} /><div><h2 className="font-semibold text-slate-900">{displayName(otherPerson(selected))}</h2><p className="text-xs text-slate-500">{presence[otherPerson(selected)?._id]?.online ? "Online" : "Offline"}</p></div></div><MoreVertical size={20} className="text-slate-500" /></div><div className="flex-1 space-y-3 overflow-y-auto bg-white p-6">{messages.map((message) => <div key={message._id} className={`flex ${message.sender?._id === otherPerson(selected)?._id ? "justify-start" : "justify-end"}`}><div className={`max-w-[75%] px-4 py-3 text-sm ${message.sender?._id === otherPerson(selected)?._id ? "bg-slate-100 text-slate-800" : "bg-[#344579] text-white"}`}>{message.body}<div className="mt-1 flex items-center justify-end gap-1 text-[10px] opacity-70">{new Date(message.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}{message.sender?._id !== otherPerson(selected)?._id && settings.readReceipts && message.readAt && <Check size={12} />}</div></div></div>)}</div><div className="flex items-center gap-3 border-t border-slate-200 px-5 py-4"><button title="Attach file" className="text-slate-400"><Paperclip size={20} /></button><input value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => event.key === "Enter" && send()} placeholder="Say something..." className="flex-1 border-b border-slate-300 px-1 py-2 text-sm outline-none focus:border-[#344579]" /><button title="Send message" onClick={send} className="bg-[#344579] p-2.5 text-white"><Send size={17} /></button></div></> : <div className="flex flex-1 flex-col items-center justify-center text-center"><MessageSquare size={52} className="text-slate-300" /><h2 className="mt-4 text-lg font-semibold">Connect with people</h2><p className="mt-1 text-sm text-slate-500">Start a private conversation with an approved alumni member.</p><button onClick={() => setShowComposer(true)} className="mt-5 bg-[#ba3439] px-7 py-3 text-sm font-semibold text-white">SEND NEW MESSAGE</button></div>}</main></div></div>{showSettings && <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/25 p-4"><div className="w-full max-w-md bg-white p-6 shadow-xl"><div className="flex justify-between"><h2 className="text-xl font-medium">Settings</h2><button onClick={() => setShowSettings(false)}><X /></button></div>{[["showOnlineStatus", "Show online status", "If you turn this option off you will not be able to see when others are online."], ["readReceipts", "Show read status", "Read receipts are sent only when this option is enabled."], ["messageNotifications", "Message notifications", "Receive notifications when someone sends you a message."]].map(([key, label, description]) => <div key={key} className="mt-6 flex items-start justify-between gap-5"><div><h3 className="font-medium">{label}</h3><p className="mt-1 text-sm text-slate-500">{description}</p></div><button onClick={() => saveSettings(key, !settings[key])} className={`mt-1 h-5 w-10 rounded-full p-0.5 ${settings[key] ? "bg-[#9da9df]" : "bg-slate-300"}`}><span className={`block h-4 w-4 rounded-full bg-[#344579] transition-transform ${settings[key] ? "translate-x-5" : ""}`} /></button></div>)}</div></div>}{showComposer && <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/25 p-4"><div className="w-full max-w-2xl bg-white p-6 shadow-xl"><div className="flex justify-between"><h2 className="text-xl font-medium">Send Message</h2><button onClick={() => setShowComposer(false)}><X /></button></div><label className="mt-7 block text-sm">To:<select value={recipientId} onChange={(event) => { setRecipientId(event.target.value); setRecipientName(event.target.options[event.target.selectedIndex].text); }} className="mt-2 block w-full border-b border-slate-300 px-1 py-3 outline-none"><option value="">Add People</option>{recipientId && !selectedRecipientIsListed && <option value={recipientId}>{recipientName || "Selected alumni"}</option>}{people.map((person) => <option key={person._id} value={person._id}>{displayName(person)}</option>)}</select></label><label className="mt-8 block text-sm">Message<textarea rows="5" value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Write your message here..." className="mt-2 block w-full border-b-2 border-[#344579] px-1 py-3 outline-none" /></label><div className="mt-6 flex justify-end gap-4"><button onClick={() => setShowComposer(false)} className="px-4 py-2 text-sm font-semibold text-[#ba3439]">CANCEL</button><button onClick={startConversation} className="bg-[#344579] px-5 py-2.5 text-sm font-semibold text-white">SEND</button></div></div></div>}</div>;
};
export default MessagesPage;
