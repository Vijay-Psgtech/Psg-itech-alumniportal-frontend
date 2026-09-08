import { useEffect, useState } from "react";
import {
    BarChart3,
    Clock3,
    Edit3,
    Mail,
    RefreshCw,
    Save,
    Send,
    Settings,
    Trash2,
} from "lucide-react";
import { mailingsAPI } from "../../services/api";

const EMPTY_COMPOSE = {
    id: "",
    subject: "",
    html: "Dear [NAME],\n\n\n[Signature]",
    recipientType: "all",
    department: "",
    batchYear: "",
    recipients: "",
};

const formatDate = (value) => (value ? new Date(value).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "-");

const Stat = ({ label, value, accent }) => (
    <div className="bg-white border border-slate-200 px-5 py-4">
        <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
        <p className={`mt-2 text-2xl font-semibold ${accent}`}>{value.toLocaleString()}</p>
    </div>
);

const MailingTab = ({ onError, onSuccess }) => {
    const [view, setView] = useState("send");
    const [compose, setCompose] = useState(EMPTY_COMPOSE);
    const [drafts, setDrafts] = useState([]);
    const [settings, setSettings] = useState(null);
    const [analytics, setAnalytics] = useState({ totals: { sent: 0, delivered: 0, opened: 0, clicked: 0, failed: 0 }, mailings: [], creditsRemaining: 0 });
    const [templates, setTemplates] = useState([]);
    const [templateName, setTemplateName] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const load = async () => {
        setLoading(true);
        try {
            const [draftResponse, settingsResponse, analyticsResponse] = await Promise.all([
                mailingsAPI.getAll({ status: "Draft" }),
                mailingsAPI.getSettings(),
                mailingsAPI.getAnalytics(),
            ]);
            const templateResponse = await mailingsAPI.getTemplates();
            setDrafts(draftResponse.data.mailings || []);
            setSettings(settingsResponse.data.settings || {});
            setAnalytics(analyticsResponse.data);
            setTemplates(templateResponse.data.templates || []);
        } catch (error) {
            onError(error.response?.data?.message || "Unable to load mailing data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { load(); }, []);

    const updateCompose = (key, value) => setCompose((current) => ({ ...current, [key]: value }));
    const applyTemplate = (id) => {
        const template = templates.find((item) => item._id === id);
        if (template) setCompose((current) => ({ ...current, subject: template.subject, html: template.html.replace(/<br\s*\/?>(\n)?/gi, "\n") }));
    };
    const saveTemplate = async () => {
        if (!templateName.trim() || !compose.subject.trim()) return onError("Enter a template name and subject first");
        try {
            await mailingsAPI.createTemplate({ name: templateName, subject: compose.subject, html: compose.html.replace(/\n/g, "<br>") });
            setTemplateName("");
            await load();
            notify("Mail template saved");
        } catch (error) { onError(error.response?.data?.message || "Unable to save template"); }
    };
    const notify = (message) => { onSuccess(message); window.setTimeout(() => onSuccess(""), 3000); };

    const buildPayload = () => ({
        subject: compose.subject,
        html: compose.html.replace(/\n/g, "<br>"),
        senderName: settings?.senderName,
        senderEmail: settings?.sendFrom,
        replyTo: settings?.replyTo,
        recipientType: compose.recipientType,
        recipientFilter: { department: compose.department, batchYear: compose.batchYear },
        recipients: compose.recipients.split(/[\n,]+/).map((email) => ({ email: email.trim() })).filter((recipient) => recipient.email),
    });

    const saveDraft = async (sendNow = false) => {
        if (!compose.subject.trim() || !settings?.sendFrom) {
            onError("Subject and a configured sender address are required");
            return;
        }
        setSaving(true);
        try {
            const response = compose.id
                ? await mailingsAPI.update(compose.id, buildPayload())
                : await mailingsAPI.create(buildPayload());
            if (sendNow) {
                await mailingsAPI.send(response.data.mailing._id);
                notify("Mail sent successfully");
            } else {
                notify("Draft saved");
            }
            setCompose(EMPTY_COMPOSE);
            await load();
            setView(sendNow ? "analytics" : "drafts");
        } catch (error) {
            onError(error.response?.data?.message || "Unable to save or send mail");
        } finally {
            setSaving(false);
        }
    };

    const editDraft = (draft) => {
        setCompose({
            id: draft._id,
            subject: draft.subject,
            html: draft.html.replace(/<br\s*\/?>(\n)?/gi, "\n"),
            recipientType: draft.recipientType,
            department: draft.recipientFilter?.department || "",
            batchYear: draft.recipientFilter?.batchYear || "",
            recipients: (draft.recipients || []).map((recipient) => recipient.email).join("\n"),
        });
        setView("send");
    };

    const deleteDraft = async (id) => {
        try {
            await mailingsAPI.delete(id);
            notify("Draft deleted");
            await load();
        } catch (error) {
            onError(error.response?.data?.message || "Unable to delete draft");
        }
    };

    const updateSetting = (key, value) => setSettings((current) => ({ ...current, [key]: value }));
    const saveSettings = async () => {
        setSaving(true);
        try {
            const response = await mailingsAPI.updateSettings(settings);
            setSettings(response.data.settings);
            notify("Mail configuration saved");
        } catch (error) {
            onError(error.response?.data?.message || "Unable to save mail configuration");
        } finally {
            setSaving(false);
        }
    };

    const tabs = [
        { key: "send", label: "Send New Mail", icon: Send },
        { key: "drafts", label: "Drafts", icon: Clock3, count: drafts.length },
        { key: "analytics", label: "Mail Analytics", icon: BarChart3 },
        { key: "configuration", label: "Mail Configuration", icon: Settings },
    ];

    if (loading) return <div className="bg-white border border-slate-200 p-12 text-center text-slate-500">Loading mailing workspace...</div>;

    return (
        <div className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 bg-[#344579] px-6 py-4 text-white">
                <div><p className="text-xs uppercase tracking-[0.2em] text-blue-100">Communication center</p><h2 className="mt-1 text-xl font-semibold">Mailing</h2></div>
                <button onClick={load} className="inline-flex items-center gap-2 border border-white/30 px-3 py-2 text-sm hover:bg-white/10"><RefreshCw size={15} /> Refresh</button>
            </div>

            <div className="grid grid-cols-1 gap-2 md:grid-cols-4">
                {tabs.map(({ key, label, icon: Icon, count }) => (
                    <button key={key} onClick={() => setView(key)} className={`flex items-center justify-between border px-4 py-3 text-left text-sm font-medium ${view === key ? "border-[#344579] bg-[#eaf0ff] text-[#263a78]" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}>
                        <span className="flex items-center gap-2"><Icon size={16} /> {label}</span>{count !== undefined && <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs">{count}</span>}
                    </button>
                ))}
            </div>

            {view === "send" && (
                <section className="bg-white border border-slate-200">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-6 py-5"><div><h3 className="text-lg font-semibold text-slate-900">Send Mail</h3><p className="mt-1 text-sm text-slate-500">Create a message for approved alumni.</p></div><span className="text-sm text-slate-600"><strong className="text-slate-900">{analytics.creditsRemaining.toLocaleString()}</strong> mail credits remaining</span></div>
                    <div className="space-y-6 p-6">
                        <div className="flex flex-wrap items-end gap-3 border-b border-slate-100 pb-5"><label className="text-sm text-slate-600">Use saved template<select onChange={(event) => applyTemplate(event.target.value)} defaultValue="" className="mt-2 block min-w-64 border border-slate-300 px-3 py-2 text-slate-900"><option value="">Choose a template</option>{templates.map((template) => <option key={template._id} value={template._id}>{template.name}</option>)}</select></label><input value={templateName} onChange={(event) => setTemplateName(event.target.value)} placeholder="New template name" className="border border-slate-300 px-3 py-2 text-sm outline-none" /><button onClick={saveTemplate} className="border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">Save Template</button></div>
                        <div className="flex flex-wrap items-center gap-5 text-sm text-slate-600"><span>Mail to:</span>{[["all", "All Users"], ["filtered", "Filtered Users"], ["specific", "Specific Users"]].map(([value, label]) => <label key={value} className="inline-flex items-center gap-2"><input type="radio" name="recipientType" checked={compose.recipientType === value} onChange={() => updateCompose("recipientType", value)} />{label}</label>)}</div>
                        <div className="grid gap-5 md:grid-cols-2"><label className="text-sm text-slate-600">Sender Name<input value={settings?.senderName || ""} readOnly className="mt-2 w-full border-b border-slate-300 px-1 py-2 text-slate-900 outline-none" /></label><label className="text-sm text-slate-600">Send From<input value={settings?.sendFrom || "Not configured"} readOnly className="mt-2 w-full border-b border-slate-300 px-1 py-2 text-slate-900 outline-none" /></label></div>
                        {compose.recipientType === "filtered" && <div className="grid gap-5 md:grid-cols-2"><label className="text-sm text-slate-600">Department<input value={compose.department} onChange={(event) => updateCompose("department", event.target.value)} placeholder="e.g. CSE" className="mt-2 w-full border border-slate-300 px-3 py-2 outline-none focus:border-[#344579]" /></label><label className="text-sm text-slate-600">Batch year<input value={compose.batchYear} onChange={(event) => updateCompose("batchYear", event.target.value)} placeholder="e.g. 2021" className="mt-2 w-full border border-slate-300 px-3 py-2 outline-none focus:border-[#344579]" /></label></div>}
                        {compose.recipientType === "specific" && <label className="text-sm text-slate-600">Email addresses<span className="ml-2 text-xs text-slate-400">comma or line separated</span><textarea value={compose.recipients} onChange={(event) => updateCompose("recipients", event.target.value)} rows="3" className="mt-2 w-full border border-slate-300 px-3 py-2 outline-none focus:border-[#344579]" /></label>}
                        <label className="block text-sm text-slate-600">Subject<input value={compose.subject} onChange={(event) => updateCompose("subject", event.target.value)} placeholder="Subject" className="mt-2 w-full border-b border-slate-300 px-1 py-2 text-slate-900 outline-none focus:border-[#344579]" /></label>
                        <label className="block text-sm text-slate-600">Message<textarea value={compose.html} onChange={(event) => updateCompose("html", event.target.value)} rows="10" className="mt-2 w-full border border-slate-300 px-4 py-3 font-sans text-sm text-slate-900 outline-none focus:border-[#344579]" /></label>
                        <div className="flex flex-wrap justify-end gap-3"><button disabled={saving} onClick={() => saveDraft(false)} className="inline-flex items-center gap-2 border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"><Save size={16} /> Save Draft</button><button disabled={saving} onClick={() => saveDraft(true)} className="inline-flex items-center gap-2 bg-[#344579] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#263a78] disabled:opacity-50"><Send size={16} /> {saving ? "Sending..." : "Send Mail"}</button></div>
                    </div>
                </section>
            )}

            {view === "drafts" && <section className="space-y-3"><div className="border border-slate-200 bg-white px-6 py-5"><h3 className="text-lg font-semibold text-slate-900">Draft Mails</h3><p className="mt-1 text-sm text-slate-500">Edit a draft and send it when ready.</p></div>{drafts.length === 0 ? <div className="border border-dashed border-slate-300 bg-white p-12 text-center text-slate-500">No draft mails yet.</div> : drafts.map((draft) => <div key={draft._id} className="flex flex-wrap items-center justify-between gap-4 border border-slate-200 bg-white px-6 py-5"><div className="flex items-center gap-4"><div className="flex h-12 w-12 flex-col items-center justify-center bg-[#009f98] text-white"><span className="text-lg font-semibold">{new Date(draft.createdAt).getDate()}</span><span className="text-[10px] uppercase">{new Date(draft.createdAt).toLocaleDateString("en", { month: "short" })}</span></div><div><h4 className="font-medium text-slate-900">{draft.subject}</h4><p className="mt-1 text-sm text-slate-500">Last edited {formatDate(draft.updatedAt)}</p></div></div><div className="flex gap-2"><button title="Edit draft" onClick={() => editDraft(draft)} className="border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"><Edit3 size={16} /></button><button title="Delete draft" onClick={() => deleteDraft(draft._id)} className="border border-slate-200 p-2 text-red-600 hover:bg-red-50"><Trash2 size={16} /></button></div></div>)}</section>}

            {view === "analytics" && <section className="space-y-5"><div className="flex flex-wrap items-center justify-between gap-3 bg-white px-6 py-5"><div><h3 className="text-lg font-semibold text-slate-900">Mail Analytics</h3><p className="mt-1 text-sm text-slate-500">Delivery performance for organization mails.</p></div><span className="inline-flex items-center gap-2 text-sm text-slate-600"><Mail size={16} /> {analytics.mailings.length} campaigns</span></div><div className="grid grid-cols-2 gap-3 md:grid-cols-5"><Stat label="Sent" value={analytics.totals.sent} accent="text-[#344579]" /><Stat label="Delivered" value={analytics.totals.delivered} accent="text-emerald-600" /><Stat label="Opened" value={analytics.totals.opened} accent="text-blue-600" /><Stat label="Clicked" value={analytics.totals.clicked} accent="text-amber-600" /><Stat label="Failed" value={analytics.totals.failed} accent="text-red-600" /></div><div className="overflow-x-auto border border-slate-200 bg-white"><table className="w-full min-w-[680px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="px-5 py-3">Mail</th><th className="px-5 py-3">Status</th><th className="px-5 py-3">Sent</th><th className="px-5 py-3">Opened</th><th className="px-5 py-3">Clicked</th><th className="px-5 py-3">Date</th></tr></thead><tbody>{analytics.mailings.map((mailing) => <tr key={mailing._id} className="border-t border-slate-100"><td className="px-5 py-4 font-medium text-slate-900">{mailing.subject}</td><td className="px-5 py-4"><span className={mailing.status === "Sent" ? "text-emerald-600" : "text-red-600"}>{mailing.status}</span></td><td className="px-5 py-4">{mailing.metrics?.sent || 0}</td><td className="px-5 py-4">{mailing.metrics?.opened || 0}</td><td className="px-5 py-4">{mailing.metrics?.clicked || 0}</td><td className="px-5 py-4 text-slate-500">{formatDate(mailing.sentAt || mailing.updatedAt)}</td></tr>)}</tbody></table>{analytics.mailings.length === 0 && <p className="p-10 text-center text-slate-500">No sent mail analytics yet.</p>}</div></section>}

            {view === "configuration" && settings && <section className="space-y-5"><div className="bg-white px-6 py-5"><h3 className="text-lg font-semibold text-slate-900">Mail Configuration</h3><p className="mt-1 text-sm text-slate-500">These defaults are applied to every organization mail.</p></div><div className="border border-slate-200 bg-white p-6"><div className="grid gap-5 md:grid-cols-2"><label className="text-sm text-slate-600">Default send from<input value={settings.sendFrom || ""} onChange={(event) => updateSetting("sendFrom", event.target.value)} placeholder="connect@example.org" className="mt-2 w-full border-b border-slate-300 px-1 py-2 text-slate-900 outline-none focus:border-[#344579]" /></label><label className="text-sm text-slate-600">Receive replies on<input value={settings.replyTo || ""} onChange={(event) => updateSetting("replyTo", event.target.value)} placeholder="alumni@example.org" className="mt-2 w-full border-b border-slate-300 px-1 py-2 text-slate-900 outline-none focus:border-[#344579]" /></label><label className="text-sm text-slate-600 md:col-span-2">Sender name<input value={settings.senderName || ""} onChange={(event) => updateSetting("senderName", event.target.value)} className="mt-2 w-full border-b border-slate-300 px-1 py-2 text-slate-900 outline-none focus:border-[#344579]" /></label></div><label className="mt-6 block text-sm text-slate-600">Email signature<textarea value={settings.signature || ""} onChange={(event) => updateSetting("signature", event.target.value)} rows="5" className="mt-2 w-full border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#344579]" /></label><div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5"><label className="flex items-center gap-3 text-sm text-slate-700"><input type="checkbox" checked={Boolean(settings.platformLoginEnabled)} onChange={(event) => updateSetting("platformLoginEnabled", event.target.checked)} /> Platform login through email</label><button disabled={saving} onClick={saveSettings} className="inline-flex items-center gap-2 bg-[#344579] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#263a78] disabled:opacity-50"><Save size={16} /> Save</button></div></div></section>}
        </div>
    );
};

export default MailingTab;