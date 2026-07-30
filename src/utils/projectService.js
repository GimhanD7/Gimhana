const API_URL = process.env.REACT_APP_API_URL || '/Gimhana/api/index.php';

let csrfToken = null;

const request = async (action, options = {}) => {
  const url = new URL(API_URL, window.location.origin);
  url.searchParams.set('action', action);
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 10000);

  if (options.id !== undefined) {
    url.searchParams.set('id', options.id);
  }

  let response;
  try {
    response = await fetch(url.toString(), {
      method: options.method || 'GET',
      credentials: 'same-origin',
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
        ...(options.body ? { 'Content-Type': 'application/json' } : {}),
        ...(csrfToken ? { 'X-CSRF-Token': csrfToken } : {}),
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('The server took too long to respond. Check Apache and MySQL.');
    }
    throw new Error('Unable to connect to the PHP backend.');
  } finally {
    window.clearTimeout(timeout);
  }

  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error('The server returned an invalid response.');
  }

  if (!response.ok) {
    const error = new Error(data.error || 'The request failed.');
    error.status = response.status;
    throw error;
  }

  if (data.csrfToken) {
    csrfToken = data.csrfToken;
  }

  return data;
};

const normalizeProject = (project) => ({
  ...project,
  id: String(project.id),
  technologies: Array.isArray(project.technologies) ? project.technologies : [],
  links: Array.isArray(project.links) ? project.links : [],
  gallery: Array.isArray(project.gallery) ? project.gallery : [],
  image: project.image || 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
});

export const authService = {
  async getSession() {
    const data = await request('session');
    csrfToken = data.csrfToken || null;
    return data;
  },

  async login(username, password) {
    return request('login', {
      method: 'POST',
      body: { username, password },
    });
  },

  async logout() {
    const result = await request('logout', { method: 'POST' });
    csrfToken = null;
    return result;
  },
};

export const projectService = {
  async getProjects() {
    const data = await request('projects');
    return (data.projects || []).map(normalizeProject);
  },

  async getProject(projectId) {
    try {
      const data = await request('project', { id: projectId });
      return normalizeProject(data.project);
    } catch (error) {
      if (error.status === 404) {
        return null;
      }
      throw error;
    }
  },

  async saveProject(project) {
    const isEditing = Boolean(project.id);
    const data = await request(isEditing ? 'project' : 'projects', {
      id: isEditing ? project.id : undefined,
      method: isEditing ? 'PUT' : 'POST',
      body: project,
    });
    return normalizeProject(data.project);
  },

  async deleteProject(projectId) {
    await request('project', {
      id: projectId,
      method: 'DELETE',
    });
  },

  async reorderProjects(projectIds) {
    await request('reorder-projects', {
      method: 'POST',
      body: { projectIds },
    });
  },
};
