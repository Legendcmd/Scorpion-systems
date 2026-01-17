
import React, { useState } from 'react';
import { User, ProjectFile } from '../types';

const ProjectHub: React.FC<{ user: User }> = ({ user }) => {
  const [files, setFiles] = useState<ProjectFile[]>([
    {
      id: '1',
      name: 'NeuralOptimizer.py',
      type: 'code',
      content: 'import scorpion_ai as sc\n\ndef optimize_edge_node(node_id):\n    print(f"Optimizing node {node_id}")\n    return sc.Engine.v2.trigger()',
      parentId: null,
      uploadedBy: 'Alex "Venom"',
      comments: [{ user: 'Sarah "Stinger"', text: 'Looks efficient. Check the latency on line 5.', date: '2024-11-20' }]
    },
    { id: '2', name: 'System_Diagram.png', type: 'image', parentId: null, uploadedBy: 'System', comments: [] },
    { id: '3', name: 'Internal Docs', type: 'folder', parentId: null, uploadedBy: 'System', comments: [] },
  ]);

  const [selectedFile, setSelectedFile] = useState<ProjectFile | null>(null);
  const [newComment, setNewComment] = useState('');

  const handleUpload = () => {
    // Simulated upload
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      const newF: ProjectFile = {
        id: crypto.randomUUID(),
        name: file.name,
        type: file.type.includes('image') ? 'image' : 'code',
        parentId: null,
        uploadedBy: user.fullName,
        comments: []
      };
      setFiles([newF, ...files]);
    };
    input.click();
  };

  const addComment = () => {
    if (!selectedFile || !newComment.trim()) return;
    const updated = files.map(f => {
      if (f.id === selectedFile.id) {
        return {
          ...f,
          comments: [...f.comments, { user: user.fullName, text: newComment, date: new Date().toLocaleDateString() }]
        };
      }
      return f;
    });
    setFiles(updated);
    setSelectedFile(updated.find(f => f.id === selectedFile.id) || null);
    setNewComment('');
  };

  const handleRequestApproval = () => {
    alert("Sending encrypted request to 1i.vihaandwivedi@gmail.com... Finalizing publishing protocol.");
  };

  return (
    <div className="animate-in slide-in-from-right duration-500">
      <header className="flex justify-between items-center mb-12">
        <div>
          <h2 className="text-4xl font-black italic tracking-tighter uppercase text-amber-500">Scorpion Hub</h2>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Distributed Asset Repository</p>
        </div>
        <div className="flex gap-4">
          <button onClick={handleRequestApproval} className="px-6 py-3 border border-amber-500/50 text-amber-500 text-xs font-bold uppercase tracking-widest hover:bg-amber-500 hover:text-black transition-all rounded-xl">
             Request Approval
          </button>
          <button onClick={handleUpload} className="px-6 py-3 bg-amber-600 text-black text-xs font-bold uppercase tracking-widest hover:bg-amber-500 transition-all rounded-xl">
            Upload Asset
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-4">
          {files.map(f => (
            <button 
              key={f.id}
              onClick={() => setSelectedFile(f)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl glass transition-all border ${selectedFile?.id === f.id ? 'border-amber-500/50 bg-amber-500/5' : 'border-white/5 hover:border-white/20'}`}
            >
              <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-amber-500">
                {f.type === 'folder' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                )}
              </div>
              <div className="text-left">
                <div className="text-sm font-bold">{f.name}</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest">{f.uploadedBy}</div>
              </div>
            </button>
          ))}
        </div>

        <div className="lg:col-span-2 glass rounded-3xl p-8 border-white/5 min-h-[500px] flex flex-col">
          {selectedFile ? (
            <>
              <div className="flex justify-between items-start mb-8">
                <h3 className="text-2xl font-bold tracking-tight">{selectedFile.name}</h3>
                <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold uppercase tracking-widest text-amber-500">{selectedFile.type}</span>
              </div>
              
              <div className="flex-1 bg-black/50 rounded-2xl p-6 mb-8 border border-white/5 mono text-sm overflow-auto max-h-96">
                {selectedFile.type === 'code' ? (
                  <pre className="text-gray-400 leading-relaxed">{selectedFile.content || "// No code source available."}</pre>
                ) : selectedFile.type === 'image' ? (
                  <div className="h-full flex items-center justify-center opacity-40">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-600">Folder contents indexed. 0 bytes.</div>
                )}
              </div>

              <div className="border-t border-white/5 pt-8">
                <h4 className="text-xs font-bold uppercase tracking-widest mb-4">Discussion Node</h4>
                <div className="space-y-4 mb-6">
                  {selectedFile.comments.map((c, i) => (
                    <div key={i} className="bg-white/5 p-4 rounded-xl text-sm border border-white/5">
                      <div className="flex justify-between mb-2">
                        <span className="text-amber-500 font-bold">{c.user}</span>
                        <span className="text-[10px] text-gray-600">{c.date}</span>
                      </div>
                      <p className="text-gray-400">{c.text}</p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input 
                    value={newComment}
                    onChange={e => setNewComment(e.target.value)}
                    placeholder="Contribute to thread..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 text-sm outline-none focus:border-amber-500 transition-all"
                  />
                  <button 
                    onClick={addComment}
                    className="p-3 bg-amber-600 text-black rounded-xl hover:bg-amber-500 transition-all"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2 11 13"/><path d="m22 2-7 20-4-9-9-4Z"/></svg>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-600 space-y-4">
               <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/></svg>
               <p className="font-bold uppercase tracking-widest text-xs">Select an asset to view blueprints</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectHub;
