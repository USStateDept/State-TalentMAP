import React from 'react';
import Alert from '../../Alert';
import { getAssetPath } from '../../../utilities';

const AboutContent = () => (
  <div className="usa-grid-full">
    <h1>About TalentMAP</h1>
    <p>
      {`TalentMAP is a multi-year, department-wide talent management platform
      expanding the Foreign Service (FS) bidding and assignments concept to become
      a much greater strategy for managing our FS talent worldwide to:`}
    </p>
    <ul>
      <li><span>Manage our assignment processes</span></li>
      <li><span>Align our people to positions</span></li>
      <li><span>Project our workforce planning of the future</span></li>
    </ul>
    <h2>Our Mission</h2>
    <p>
      {`HR/CDA supports the Department of State (DOS) mission by transparently and
      equitably assigning employees with the right skills to the right
      positions at the right time.`}
    </p>
    <Alert
      type="info"
      title="TalentMAP Progress is Ongoing"
      messages={[{ body: <span>For more information, visit <a rel="noopener noreferrer" target="_blank" href={getAssetPath('/about/more')}>HR Systems Online Resources</a>.</span> }]}
    />
    <h2>How TalentMAP Works</h2>
    <p>
      {`The Bureau of Human Resources Executive Office (HR/EX) in partnership with the Bureau
      of Human Resources Office of Career Development and Assignments (HR/CDA)
      are developing a new application, TalentMAP, aimed at replacing the Foreign
      Service Bidding (FSBid) application. TalentMAP will serve as a unified source of
      information regarding available FS positions and post data for Foreign Service
      employees. HR/EX aims to ensure TalentMAP becomes a secure, reliable, and central
      system that will support the HR/CDA business processes.`}
    </p>
    <p>
      {`TalentMAP will maintain the existing business functionality and meet evolving
      requirements while leveraging best practices in software development. As a result
      of TalentMAP, DOS will be able to better carry out its diplomatic mission by improving
      the matching process, reducing the amount of time it takes for FS employees to find
      jobs that align with their skills, and improving the workflow for administrative
      staff to manage FS employees.`}
    </p>
    <h2>Help Build TalentMAP</h2>
    <p>
      {`The first phase of the TalentMAP release will be optional for bidders offering a search
      and view-only option. The DOS employee will have the ability to search for potential
      positions, research posts, and add positions as “favorites.” Favorited positions
      will organize the bidder in order to make a determination on which positions they
      intend to bid.`}
    </p>
    <p>
      {`During the first phase, DOS employees will need to return to FSBid to
      submit their bid(s) and continue the assignment process. FS bidders can
      choose to pilot the TalentMAP application to better understand the
      functionality and have the opportunity to provide feedback.`}
    </p>
    <a type="submit" role="button" href="mailto:TalentMAP@State.gov" className="tm-button-feedback">Email TalentMAP</a>
  </div>
);

export default AboutContent;
