import React, { useState } from 'react';
import { SlideData } from '../types';
import { Plus, Trash2, Save, X, Edit2, ArrowLeft } from 'lucide-react';

interface Props {
  slides: SlideData[];
  onSave: (slides: SlideData[]) => void;
  onClose: () => void;
}

const AdminPanel: React.FC<Props> = ({ slides, onSave, onClose }) => {
  const [localSlides, setLocalSlides] = useState<SlideData[]>(slides);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form State
  const [formData, setFormData] = useState<Partial<SlideData>>({});

  const handleEdit = (slide: SlideData) => {
    setEditingId(slide.id);
    setFormData(slide);
  };

  const handleCreate = () => {
    const newSlide: SlideData = {
      id: Date.now().toString(),
      type: 'promo',
      day: 'Monday',
      title: 'New Special',
      description: 'Description here...',
      price: '$0',
      imageUrl: 'https://picsum.photos/1920/1080',
      highlightColor: '#eab308'
    };
    setLocalSlides([...localSlides, newSlide]);
    handleEdit(newSlide);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this slide?')) {
      const updated = localSlides.filter(s => s.id !== id);
      setLocalSlides(updated);
      onSave(updated); // Auto save on delete
      if (editingId === id) setEditingId(null);
    }
  };

  const handleSaveForm = () => {
    if (!formData.id) return;
    
    const updated = localSlides.map(s => 
      s.id === formData.id ? { ...s, ...formData } as SlideData : s
    );
    setLocalSlides(updated);
    onSave(updated);
    setEditingId(null);
    setFormData({});
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900 text-white overflow-y-auto">
      <div className="max-w-6xl mx-auto p-8">
        <div className="flex justify-between items-center mb-10 border-b border-slate-700 pb-6">
          <div className="flex items-center gap-4">
            <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-3xl font-serif font-bold text-amber-500">Slide Management</h1>
          </div>
          <button 
            onClick={handleCreate}
            className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-bold transition-all shadow-lg"
          >
            <Plus className="w-5 h-5" /> Add New Slide
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* List View */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4 text-slate-400 uppercase tracking-wider">Active Slides</h2>
            {localSlides.filter(s => s.type === 'promo').map(slide => (
              <div 
                key={slide.id} 
                className={`p-4 rounded-xl border transition-all cursor-pointer flex justify-between items-center group
                  ${editingId === slide.id ? 'bg-amber-900/30 border-amber-500' : 'bg-slate-800 border-slate-700 hover:border-slate-500'}`}
                onClick={() => handleEdit(slide)}
              >
                <div className="flex gap-4 items-center">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-900 shrink-0">
                    <img src={slide.imageUrl} className="w-full h-full object-cover" alt="thumbnail" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{slide.title}</h3>
                    <p className="text-slate-400 text-sm">{slide.day} • {slide.price}</p>
                  </div>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={(e) => { e.stopPropagation(); handleEdit(slide); }} className="p-2 hover:bg-blue-600/20 text-blue-400 rounded-full">
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); handleDelete(slide.id); }} className="p-2 hover:bg-red-600/20 text-red-400 rounded-full">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Edit Form */}
          <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 sticky top-8 h-fit">
            {editingId ? (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Edit Slide</h2>
                  <button onClick={() => setEditingId(null)} className="text-slate-400 hover:text-white">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400">Day / Label</label>
                    <input 
                      type="text" 
                      value={formData.day || ''} 
                      onChange={e => setFormData({...formData, day: e.target.value})}
                      className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400">Price / Time</label>
                    <input 
                      type="text" 
                      value={formData.price || ''} 
                      onChange={e => setFormData({...formData, price: e.target.value})}
                      className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-400">Title</label>
                  <input 
                    type="text" 
                    value={formData.title || ''} 
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-400">Description</label>
                  <textarea 
                    value={formData.description || ''} 
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    rows={4}
                    className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-400">Image URL</label>
                  <input 
                    type="text" 
                    value={formData.imageUrl || ''} 
                    onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 focus:border-amber-500 focus:outline-none text-sm font-mono"
                  />
                  <p className="text-xs text-slate-500">Use 'https://picsum.photos/1920/1080' for a random placeholder.</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-400">Highlight Color</label>
                  <div className="flex gap-2">
                    <input 
                      type="color" 
                      value={formData.highlightColor || '#eab308'} 
                      onChange={e => setFormData({...formData, highlightColor: e.target.value})}
                      className="h-10 w-20 bg-transparent cursor-pointer rounded overflow-hidden"
                    />
                    <input 
                      type="text"
                      value={formData.highlightColor || ''}
                      onChange={e => setFormData({...formData, highlightColor: e.target.value})}
                      className="flex-1 bg-slate-900 border border-slate-600 rounded-lg p-3 uppercase font-mono"
                    />
                  </div>
                </div>

                <button 
                  onClick={handleSaveForm}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all"
                >
                  <Save className="w-5 h-5" /> Save Changes
                </button>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 opacity-50">
                <Edit2 className="w-16 h-16 mb-4" />
                <p className="text-xl">Select a slide to edit or create new.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
