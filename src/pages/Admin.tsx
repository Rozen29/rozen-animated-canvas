
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import projects, { Project } from '../data/projects';
import { Button } from '../components/ui/button';

const Admin = () => {
  const [projectsList, setProjectsList] = useState<Project[]>(projects);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<Partial<Project>>({
    id: 0,
    title: '',
    slug: '',
    description: '',
    fullDescription: '',
    image: '',
    tags: [],
    features: [],
    dateCompleted: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleArrayInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>, field: 'tags' | 'features') => {
    const values = e.target.value.split('\n').filter(item => item.trim() !== '');
    setFormData({
      ...formData,
      [field]: values
    });
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setFormData({
      ...project,
      tags: project.tags,
      features: project.features
    });
    setIsCreating(false);
  };

  const handleCreateNew = () => {
    setIsCreating(true);
    setEditingProject(null);
    setFormData({
      id: Math.max(0, ...projectsList.map(p => p.id)) + 1,
      title: '',
      slug: '',
      description: '',
      fullDescription: '',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
      tags: [],
      features: [],
      dateCompleted: new Date().toISOString().split('T')[0]
    });
  };

  const handleDeleteProject = (id: number) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setProjectsList(projectsList.filter(project => project.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isCreating) {
      // Create new project
      setProjectsList([...projectsList, formData as Project]);
    } else if (editingProject) {
      // Update existing project
      setProjectsList(
        projectsList.map(project => 
          project.id === editingProject.id ? { ...formData as Project } : project
        )
      );
    }
    
    // Reset form
    setEditingProject(null);
    setIsCreating(false);
    setFormData({
      id: 0,
      title: '',
      slug: '',
      description: '',
      fullDescription: '',
      image: '',
      tags: [],
      features: [],
      dateCompleted: ''
    });
  };

  const handleCancel = () => {
    setEditingProject(null);
    setIsCreating(false);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Project Admin Dashboard</h1>
          <Link to="/" className="text-primary hover:underline">Back to Site</Link>
        </div>

        {/* Project List */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Projects</h2>
            <Button onClick={handleCreateNew}>Add New Project</Button>
          </div>

          <div className="bg-card border rounded-lg overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="px-4 py-3 text-left">ID</th>
                  <th className="px-4 py-3 text-left">Title</th>
                  <th className="px-4 py-3 text-left">Slug</th>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projectsList.map(project => (
                  <tr key={project.id} className="border-t border-border hover:bg-muted/50">
                    <td className="px-4 py-3">{project.id}</td>
                    <td className="px-4 py-3">{project.title}</td>
                    <td className="px-4 py-3">{project.slug}</td>
                    <td className="px-4 py-3">{project.dateCompleted}</td>
                    <td className="px-4 py-3 text-right">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mr-2"
                        onClick={() => handleEditProject(project)}
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDeleteProject(project.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
                {projectsList.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-6 text-center text-muted-foreground">
                      No projects available. Create your first project!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Edit/Create Form */}
        {(editingProject || isCreating) && (
          <div className="bg-card border rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-6">
              {isCreating ? 'Create New Project' : 'Edit Project'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title || ''}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-border rounded-md bg-background"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Slug</label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug || ''}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-border rounded-md bg-background"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Short Description</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-border rounded-md bg-background"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Full Description</label>
                <textarea
                  name="fullDescription"
                  value={formData.fullDescription || ''}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full p-2 border border-border rounded-md bg-background resize-none"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Image URL</label>
                  <input
                    type="text"
                    name="image"
                    value={formData.image || ''}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-border rounded-md bg-background"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Date Completed</label>
                  <input
                    type="date"
                    name="dateCompleted"
                    value={formData.dateCompleted || ''}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-border rounded-md bg-background"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Tags (one per line)</label>
                  <textarea
                    value={(formData.tags || []).join('\n')}
                    onChange={(e) => handleArrayInputChange(e, 'tags')}
                    rows={4}
                    className="w-full p-2 border border-border rounded-md bg-background resize-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Features (one per line)</label>
                  <textarea
                    value={(formData.features || []).join('\n')}
                    onChange={(e) => handleArrayInputChange(e, 'features')}
                    rows={4}
                    className="w-full p-2 border border-border rounded-md bg-background resize-none"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Demo URL (optional)</label>
                  <input
                    type="text"
                    name="demoUrl"
                    value={formData.demoUrl || ''}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-border rounded-md bg-background"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Repo URL (optional)</label>
                  <input
                    type="text"
                    name="repoUrl"
                    value={formData.repoUrl || ''}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-border rounded-md bg-background"
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button type="submit">
                  {isCreating ? 'Create Project' : 'Update Project'}
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
