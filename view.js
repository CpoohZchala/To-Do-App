class JournalView {
  constructor() {
    this.app = this.getElement('#app');
    this.entryList = this.getElement('#entryList');
    this.newEntryInput = this.getElement('#newEntry');
    this.addEntryButton = this.getElement('#addEntry');
    this.dateTimeElement = this.getElement('#dateTime');

    this.renderDateTime();
    setInterval(this.renderDateTime.bind(this), 1000);

    this.renderFilters();

  }

  getElement(selector) {
    const element = document.querySelector(selector);
    return element;
  }

  renderDateTime() {
    const now = new Date();
    const dateTimeString = now.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    this.dateTimeElement.textContent = dateTimeString;
  }

  renderFilters() {
    const filterContainer = this.getElement('.filter-container');

    filterContainer.innerHTML = `
        <button class="filter-button" data-filter="all">All</button>
        <button class="filter-button" data-filter="completed">Completed</button>
        <button class="filter-button" data-filter="pending">Pending</button>
    `;
}

  renderEntries(entries) {
    this.entryList.innerHTML = '';

    entries.forEach((entry, index) => {
      const entryItem = document.createElement('li');
      if (entry.completed) {
        entryItem.classList.add('completed');
      }
      entryItem.innerHTML = `
          <div class="entry-header">
                <span class="entry-date">${entry.date}</span>
                <div class="entry-actions">
                    <button class="complete" data-index="${index}">
                        ${entry.completed ? '<i class="fas fa-check-circle"></i>' : '<i class="far fa-circle"></i>'}
                    </button>
                    <button class="edit" data-index="${index}"><i class="fas fa-edit"></i></button>
                    <button class="delete" data-index="${index}"><i class="fas fa-trash"></i></button>
                </div>
            </div>
            <div class="entry-content">
                <span class="entry-text">${entry.text}</span>
                <span class="entry-word-count">Word Count: ${entry.wordCount}</span>
            </div>
        `;
      this.entryList.appendChild(entryItem);
    });
  }
  
}