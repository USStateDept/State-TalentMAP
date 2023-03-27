import { getAssetPath } from 'utilities';

const viewPositionText = 'To view more information about a position and add it to your bid list, click "View position". See next step for how to submit a bid after adding it to your Bid Tracker.';
const addToBidListGif = getAssetPath('/assets/img/add_to_bid_list.gif');
const submitBidGif = getAssetPath('/assets/img/submit_bid.gif');
const tandemToggleImg = getAssetPath('/assets/img/tandem_search_toggle.png');

const steps = [
  {
    target: '.results-section-container',
    disableBeacon: true,
    content: 'Welcome to the TalentMAP position search! Click "Next" for a quick tutorial on how to use this page. Click "Exit" to leave this tutorial.',
    isFixed: true,
    placement: 'top-end',
    hideCloseButton: true,
  },
  {
    target: '.filter-container',
    content: 'Use filters to narrow down your results. Note that you can switch to a Projected Vacancy search.',
    hideCloseButton: true,
  },
  {
    target: '.filter-container',
    content:
      <div>
        <div>Additionally, you can switch to a Tandem search.</div>
        <img alt="tandem search toggle png" src={tandemToggleImg} />
      </div>,
    hideCloseButton: true,
  },
  {
    target: '.results-controls',
    content: 'You can sort results, change the number of results displayed, and export or save your search',
    hideCloseButton: true,
  },
  {
    target: '.hover-description',
    content: 'Hover over the bottom of a Position Card to view its description',
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
    content:
      <div>
        <div>{viewPositionText}</div>
        <img alt="add to bid list gif" src={addToBidListGif} />
      </div>,
    hideCloseButton: true,
  },
  {
    target: '.results-card-title-link > a',
    content:
      <div>
        <div>Submitting a bid on the Bid Tracker</div>
        <img alt="submit bid gif" src={submitBidGif} />
      </div>,
    hideCloseButton: true,
  },
  {
    target: '.tutorial-help-link',
    content: 'Click the "Help" link for FAQs and additional support',
    hideCloseButton: true,
  },
];

export default steps;
