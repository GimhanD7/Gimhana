import { db } from '../firebase';
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, writeBatch } from 'firebase/firestore';

export const DEFAULT_PROJECTS = [
  {
    title: 'Tuition Class Management Systems',
    period: 'January 2025',
    description: 'Architected and developed comprehensive tuition management platforms serving multiple user roles including students, teachers, and administrators across two independent educational institutions. Implemented student enrollment, class scheduling, automated payment processing, real-time attendance tracking, and comprehensive result evaluation modules.',
    technologies: ['React.js', 'Node.js', 'MySQL', 'Express', 'Responsive Design'],
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop',
    links: [
      { label: 'Manoj Maths', url: 'http://mathswithmanoj.com/' },
      { label: 'Sudesh Maths', url: 'https://sudeshmaths.com/' }
    ]
  },
  {
    title: 'Leo Club of SLIIT Portal',
    period: 'July 2024',
    description: 'Engineered a comprehensive web-based portal streamlining internal club operations and member management processes. Implemented secure authentication protocols, role-based access controls, and user-friendly dashboards for enhanced operational efficiency.',
    technologies: ['React.js', 'Firebase', 'Authentication', 'Responsive Design'],
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop',
    links: [
      { label: 'Portal', url: 'https://web.portal.sliitleo.org' }
    ]
  },
  {
    title: 'PDF Management System (Associated Newspapers of Ceylon Limited)',
    period: 'July 2024 - December 2024',
    description: 'Developed and maintained an enterprise-grade PDF Management System handling document workflows across multiple newspaper departments, improving document organization efficiency, search functionality, and cross-departmental collaboration.',
    technologies: ['PHP', 'MySQL', 'JavaScript', 'System Enhancement'],
    category: 'System Design',
    image: 'https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=2030&auto=format&fit=crop',
    links: []
  },
  {
    title: 'Official Leo Club of SLIIT Website',
    period: 'July 2024',
    description: 'Designed and developed the official Leo Club website with emphasis on responsive design and exceptional user experience. Applied modern UI/UX practices to enhance accessibility, usability, and visual appeal across all device platforms. Managed complete website architecture, content integration, SEO optimization, and performance tuning.',
    technologies: ['React.js', 'Tailwind CSS', 'Framer Motion', 'SEO Optimization'],
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop',
    links: [
      { label: 'Official Site', url: 'https://sliitleo.org' }
    ]
  },
  {
    title: 'JCEY Tea Box Packaging Design',
    period: 'July 2023 - December 2023',
    description: 'Designed comprehensive tea box packaging for 7 regional variants and 10 flavor-based products, ensuring alignment with brand identity and market positioning. Created engaging promotional artwork and marketing materials for both digital and print platforms.',
    technologies: ['Adobe Photoshop', 'Figma', 'Branding', 'Graphic Design'],
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1544787210-2211d7c309c7?q=80&w=1974&auto=format&fit=crop',
    links: []
  },
  {
    title: 'Freelance Social Media Visual Branding',
    period: 'January 2022 - Present',
    description: 'Designed engaging and visually compelling social media content for diverse clients across multiple platforms including Facebook, Instagram, and LinkedIn. Improved brand visibility and audience engagement through strategic creative visual content development and platform-optimized designs.',
    technologies: ['Adobe Photoshop', 'Graphic Design', 'Visual Branding'],
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop',
    links: []
  }
];

const LOCAL_STORAGE_KEY = 'gimhana_fallback_projects';

// Check if we should use local storage fallback due to connection issues or missing config
const getLocalProjects = () => {
  const local = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (local) {
    try {
      const parsed = JSON.parse(local);
      // Self-Healing Sanitization: strip gallery arrays from localStorage to reclaim space immediately
      let modified = false;
      const sanitized = parsed.map(proj => {
        if (proj.gallery && proj.gallery.length > 0) {
          modified = true;
          return { ...proj, gallery: [] };
        }
        return proj;
      });
      if (modified) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sanitized));
      }
      return sanitized;
    } catch (e) {
      console.warn('Failed to parse or sanitize localStorage projects, resetting...', e);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_PROJECTS));
      return DEFAULT_PROJECTS;
    }
  }
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_PROJECTS));
  return DEFAULT_PROJECTS;
};

const saveLocalProjects = (projects) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(projects));
  } catch (err) {
    console.error('Failed to set localStorage item:', err);
  }
};

export const projectService = {
  // Helper to save gallery screenshots to a subcollection (to bypass 1MB document limit)
  async saveGalleryScreenshots(projectId, galleryArray) {
    if (!db) return;
    const screenshotsCol = collection(db, 'projects', projectId, 'screenshots');
    
    // 1. Delete all existing screenshots in the subcollection in safe chunks of 400
    const snap = await getDocs(screenshotsCol);
    const deleteDocs = snap.docs;
    for (let i = 0; i < deleteDocs.length; i += 400) {
      const batch = writeBatch(db);
      const chunk = deleteDocs.slice(i, i + 400);
      chunk.forEach((d) => {
        batch.delete(d.ref);
      });
      await batch.commit();
    }
    
    // 2. Add new screenshots with order indices in safe chunks of 400
    if (galleryArray.length > 0) {
      for (let i = 0; i < galleryArray.length; i += 400) {
        const batch = writeBatch(db);
        const chunk = galleryArray.slice(i, i + 400);
        chunk.forEach((imgBase64, index) => {
          const docRef = doc(screenshotsCol);
          batch.set(docRef, { image: imgBase64, index: i + index });
        });
        await batch.commit();
      }
    }
  },

  // Helper to load gallery screenshots from subcollection
  async getGalleryScreenshots(projectId) {
    if (!db) return [];
    try {
      const screenshotsCol = collection(db, 'projects', projectId, 'screenshots');
      const snap = await getDocs(screenshotsCol);
      const list = snap.docs.map(d => d.data());
      // Sort by index to maintain ordering
      list.sort((a, b) => a.index - b.index);
      return list.map(item => item.image);
    } catch (err) {
      console.warn('Failed to load gallery screenshots from subcollection:', err);
      return [];
    }
  },

  // Fetch a single project (merges screenshots subcollection transparently)
  async getProject(projectId) {
    try {
      if (!db) {
        const local = getLocalProjects();
        return local.find(p => p.id === projectId) || null;
      }
      const docRef = doc(db, 'projects', projectId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const projectData = { id: docSnap.id, ...docSnap.data() };
        // Merge screenshots subcollection
        const gallery = await this.getGalleryScreenshots(projectId);
        return { ...projectData, gallery };
      } else {
        const local = getLocalProjects();
        return local.find(p => p.id === projectId) || null;
      }
    } catch (error) {
      console.error('Failed to get project from Firebase, trying localStorage fallback:', error);
      const local = getLocalProjects();
      return local.find(p => p.id === projectId) || null;
    }
  },

  // Fetch all projects (with auto-seeding if Firestore is empty)
  async getProjects() {
    try {
      if (!db) {
        console.warn('Firebase DB is not initialized. Using localStorage.');
        return getLocalProjects();
      }
      const projectsCol = collection(db, 'projects');
      const projectSnapshot = await getDocs(projectsCol);
      const projectList = projectSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // If database is completely empty, perform auto-seeding
      if (projectList.length === 0) {
        console.log('Firestore is empty. Seeding DEFAULT_PROJECTS...');
        const batch = writeBatch(db);
        const seededList = [];
        for (const proj of DEFAULT_PROJECTS) {
          const docRef = doc(projectsCol);
          batch.set(docRef, proj);
          seededList.push({ id: docRef.id, ...proj });
        }
        await batch.commit();
        saveLocalProjects(seededList); // Sync fallback
        return seededList;
      }

      saveLocalProjects(projectList); // Keep local fallback updated
      return projectList;
    } catch (error) {
      console.error('Failed to load projects from Firebase. Falling back to localStorage.', error);
      return getLocalProjects();
    }
  },

  // Save (Create or Update) a project (Gallery Base64s written to subcollection)
  async saveProject(project) {
    try {
      const gallery = Array.isArray(project.gallery) ? project.gallery : [];

      const cleanProject = {
        title: project.title || '',
        period: project.period || '',
        description: project.description || '',
        technologies: Array.isArray(project.technologies) ? project.technologies : [],
        category: project.category || 'Web Development',
        image: project.image || 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
        gallery: [], // Keep empty in the main document to protect against the 1MB Firestore limit
        links: Array.isArray(project.links) ? project.links : []
      };

      if (!db) {
        throw new Error('Database is offline');
      }

      const projectsCol = collection(db, 'projects');
      let savedProject;

      if (project.id) {
        // Update existing project
        const projectDoc = doc(db, 'projects', project.id);
        await updateDoc(projectDoc, cleanProject);
        
        // Write screenshots to subcollection
        await this.saveGalleryScreenshots(project.id, gallery);
        
        savedProject = { id: project.id, ...cleanProject, gallery };
      } else {
        // Create new project
        const docRef = await addDoc(projectsCol, cleanProject);
        
        // Write screenshots to subcollection
        await this.saveGalleryScreenshots(docRef.id, gallery);
        
        savedProject = { id: docRef.id, ...cleanProject, gallery };
      }

      // Sync local storage fallback (strip gallery screenshots to protect against localStorage 5MB quota limits)
      const localProjectRepresentation = { ...savedProject, gallery: [] };
      const local = getLocalProjects();
      const updated = local.some(p => p.id === localProjectRepresentation.id)
        ? local.map(p => p.id === localProjectRepresentation.id ? localProjectRepresentation : p)
        : [...local, localProjectRepresentation];
      saveLocalProjects(updated);

      return savedProject;
    } catch (error) {
      console.error('Failed to save project to Firebase. Saving to localStorage.', error);
      
      const local = getLocalProjects();
      const cleanProject = {
        title: project.title || '',
        period: project.period || '',
        description: project.description || '',
        technologies: Array.isArray(project.technologies) ? project.technologies : [],
        category: project.category || 'Web Development',
        image: project.image || 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
        gallery: [], // Strip screenshots to prevent QuotaExceededError in localStorage fallback
        links: Array.isArray(project.links) ? project.links : []
      };

      if (project.id) {
        const updated = local.map(p => p.id === project.id ? { ...p, ...cleanProject } : p);
        saveLocalProjects(updated);
        return { id: project.id, ...cleanProject };
      } else {
        const fakeId = 'local_' + Math.random().toString(36).substr(2, 9);
        const newProj = { id: fakeId, ...cleanProject };
        local.push(newProj);
        saveLocalProjects(local);
        return newProj;
      }
    }
  },

  // Delete a project (Cleans up screenshots subcollection)
  async deleteProject(projectId) {
    try {
      if (!db) {
        throw new Error('Database is offline');
      }
      const projectDoc = doc(db, 'projects', projectId);
      
      // Delete screenshots subcollection documents first in safe chunks of 400
      try {
        const screenshotsCol = collection(db, 'projects', projectId, 'screenshots');
        const snap = await getDocs(screenshotsCol);
        const deleteDocs = snap.docs;
        for (let i = 0; i < deleteDocs.length; i += 400) {
          const batch = writeBatch(db);
          const chunk = deleteDocs.slice(i, i + 400);
          chunk.forEach(d => batch.delete(d.ref));
          await batch.commit();
        }
      } catch (subErr) {
        console.warn('Failed to delete screenshots subcollection:', subErr);
      }

      await deleteDoc(projectDoc);

      // Sync local storage fallback
      const local = getLocalProjects();
      const filtered = local.filter(p => p.id !== projectId);
      saveLocalProjects(filtered);
    } catch (error) {
      console.error('Failed to delete project from Firebase. Deleting from localStorage.', error);
      const local = getLocalProjects();
      const filtered = local.filter(p => p.id !== projectId);
      saveLocalProjects(filtered);
    }
  },

  // Reset collections back to original defaults
  async resetToDefault() {
    try {
      if (db) {
        const projectsCol = collection(db, 'projects');
        const projectSnapshot = await getDocs(projectsCol);
        
        // Delete all existing documents in Firestore
        const batch = writeBatch(db);
        projectSnapshot.docs.forEach((doc) => {
          batch.delete(doc.ref);
        });
        
        // Seed default projects
        const seededList = [];
        projectSnapshot.docs.forEach(() => {}); // compiler dummy
        for (const proj of DEFAULT_PROJECTS) {
          const docRef = doc(projectsCol);
          batch.set(docRef, proj);
          seededList.push({ id: docRef.id, ...proj });
        }
        await batch.commit();
        saveLocalProjects(seededList);
        return seededList;
      } else {
        throw new Error('Database is offline');
      }
    } catch (error) {
      console.error('Failed to reset to default. Resetting localStorage.', error);
      const seededList = DEFAULT_PROJECTS.map((proj, idx) => ({
        id: `local_default_${idx}`,
        ...proj
      }));
      saveLocalProjects(seededList);
      return seededList;
    }
  }
};
