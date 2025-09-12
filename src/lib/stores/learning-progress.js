// src/lib/stores/learning-progress.js
// A more "Svelte 5" approach using a class that plays nicely with runes

export class LearningProgressStore {
  explorations = {};
  discoveries = {};
  misconceptions = [];
  currentPath = [];

  constructor() {
    // Initialize with data from localStorage if available
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('learning-progress');
      if (saved) {
        const data = JSON.parse(saved);
        Object.assign(this, data);
      }
    }
  }

  recordExploration(projectId, action, result) {
    if (!this.explorations[projectId]) {
      this.explorations[projectId] = [];
    }

    this.explorations[projectId].push({
      action,
      result,
      timestamp: Date.now(),
    });

    // Auto-detect patterns
    if (this.detectPattern(this.explorations[projectId])) {
      this.discoveries[`${projectId}-pattern`] = {
        type: 'pattern',
        evidence: this.explorations[projectId].slice(-5),
        timestamp: Date.now(),
      };
    }

    this.save();
  }

  recordDiscovery(concept, evidence) {
    this.discoveries[concept] = {
      evidence,
      timestamp: Date.now(),
      verified: false,
    };
    this.save();
  }

  recordMisconception(concept, correction) {
    this.misconceptions.push({
      concept,
      correction,
      timestamp: Date.now(),
    });
    this.save();
  }

  detectPattern(explorations) {
    if (explorations.length < 5) return false;

    const recent = explorations.slice(-5);
    return recent.every(
      (e) =>
        e.result?.calculation?.includes('mod 4') ||
        e.result?.optimal === true
    );
  }

  getProgress(projectId) {
    return {
      explorations: this.explorations[projectId] || [],
      discoveries: Object.entries(this.discoveries)
        .filter(([key]) => key.startsWith(projectId))
        .map(([key, value]) => ({ key, ...value })),
      level: this.calculateLevel(),
    };
  }

  calculateLevel() {
    const discoveryCount = Object.keys(this.discoveries).length;
    if (discoveryCount >= 10) return 'expert';
    if (discoveryCount >= 5) return 'intermediate';
    if (discoveryCount >= 1) return 'beginner';
    return 'novice';
  }

  getTotalDiscoveries() {
    return Object.keys(this.discoveries).length;
  }

  save() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(
        'learning-progress',
        JSON.stringify({
          explorations: this.explorations,
          discoveries: this.discoveries,
          misconceptions: this.misconceptions,
          currentPath: this.currentPath,
        })
      );
    }
  }

  reset() {
    this.explorations = {};
    this.discoveries = {};
    this.misconceptions = [];
    this.currentPath = [];
    this.save();
  }
}

// Create singleton instance
export const learningProgress = new LearningProgressStore();
