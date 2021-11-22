const steps = [
  {
    target: '.results-section-container',
    disableBeacon: true,
    content: 'Welcome to the TalentMAP position search! Click "Next" for a quick tutorial on how to use this page. Click "Skip" to leave this tutorial.',
    isFixed: true,
    placement: 'top-end',
    hideCloseButton: true,
  },
  {
    target: '.filter-container',
    content: 'Use filters to narrow down your results. Note that you can switch to a Projected Vacancy or Tandem search.',
    hideCloseButton: true,
  },
  {
    target: '.results-controls',
    content: 'You can also sort results, change the page size, and export or save your search',
    hideCloseButton: true,
  },
  {
    target: '.hover-description',
    content: 'Hover over the bottom of a card to view its capsule description',
    hideCloseButton: true,
  },
  {
    target: '.favorite-container',
    content: 'Click "Add to Favorites" to add it to your personal list of favorites',
    hideCloseButton: true,
  },
  {
    target: '.compare-check-box-container',
    content: 'Click "Compare" to compare up to five positions.',
    hideCloseButton: true,
  },
  {
    target: '.results-card-title-link > a',
    content: 'To view more information about a position and add it to your bid list, click "View position"',
    hideCloseButton: true,
  },
];

export default steps;
