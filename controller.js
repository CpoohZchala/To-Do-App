class JournalController {
    constructor(model, view) {
      this.model = model;
      this.view = view;
  
      this.view.renderEntries(this.model.entries);
      this.addEventListeners();
    }
  
    addEntry(entryText) {
      this.model.addEntry(entryText);
      this.view.renderEntries(this.model.entries);
    }
    toggleComplete(index) {
      this.model.toggleComplete(index);
      this.view.renderEntries(this.model.entries);
  }
  
    editEntry(index) {
      const entry = this.model.entries[index];
      const updatedText = prompt('Edit entry:', entry.text);
      if (updatedText !== null) {
        this.model.editEntry(index, updatedText);
        this.view.renderEntries(this.model.entries);
      }
    }
  
    deleteEntry(index) {
      if (confirm('Are you sure you want to delete this entry?')) {
        this.model.deleteEntry(index);
        this.view.renderEntries(this.model.entries);
      }
    }

    filterEntries(filter) {
      let filteredEntries;
      if (filter === 'all') {
          filteredEntries = this.model.entries;
      } else if (filter === 'completed') {
          filteredEntries = this.model.entries.filter(entry => entry.completed);
      } else if (filter === 'pending') {
          filteredEntries = this.model.entries.filter(entry => !entry.completed);
      }
      this.view.renderEntries(filteredEntries);
  }
  
    addEventListeners() {
      this.view.addEntryButton.addEventListener('click', () => {
        const entryText = this.view.newEntryInput.value.trim();
        if (entryText) {
          this.addEntry(entryText);
          this.view.newEntryInput.value = '';
        }
      });
  
      this.view.entryList.addEventListener('click', (event) => {
        if (event.target.closest('.complete')) {
            const index = event.target.closest('.complete').dataset.index;
            this.toggleComplete(Number(index));
        } else if (event.target.closest('.edit')) {
            const index = event.target.closest('.edit').dataset.index;
            this.editEntry(Number(index));
        } else if (event.target.closest('.delete')) {
            const index = event.target.closest('.delete').dataset.index;
            this.deleteEntry(Number(index));
        }
    });

    document.querySelector('.filter-container').addEventListener('click', (event) => {
      if (event.target.classList.contains('filter-button')) {
          const filter = event.target.dataset.filter;
          this.filterEntries(filter);
      }
  });
    
    }
  }