class JournalModel {
    constructor() {
      this.entries = [];
    }
  
    addEntry(entryText) {
      const wordCount = entryText.trim().split(/\s+/).length;
      if (wordCount <= 250) {
        const now = new Date();
        const dateString = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        this.entries.push({ text: entryText, date: `${dateString} ${timeString}`, wordCount });
      }
    }
  
    editEntry(index, updatedText) {
      if (index >= 0 && index < this.entries.length) {
        this.entries[index].text = updatedText;
        this.entries[index].wordCount = updatedText.trim().split(/\s+/).length;
      }
    }
  
    deleteEntry(index) {
      if (index >= 0 && index < this.entries.length) {
        this.entries.splice(index, 1);
      }
    }
    toggleComplete(index) {
      if (index >= 0 && index < this.entries.length) {
          this.entries[index].completed = !this.entries[index].completed;
      }
  }
  }

  