const model = new JournalModel();
const view = new JournalView();
const controller = new JournalController(model, view);

// Show all entries on load
controller.filterEntries('all');