export default function shouldShowGlossary(state = false, action) {
  switch (action.type) {
    case 'SHOULD_SHOW_GLOSSARY':
      return action.shouldShow;
    // close Glossary on route change
    case '@@router/LOCATION_CHANGE':
      return false;
    default:
      return state;
  }
}
