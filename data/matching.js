import { services } from './services.js';
export function matchServices(input) {
  const query = String(input).toLowerCase().replace(/[^a-z0-9\s-]/g, ' ');
  return services.map(service => ({...service, score:service.terms.reduce((score, term) => {
    const pattern = new RegExp('\\b' + term + '(?:s|es|ing)?\\b', 'i');
    return score + (pattern.test(query) ? (term.includes(' ') ? 3 : 1) : 0);
  }, 0)})).filter(service => service.score > 0).sort((a,b) => b.score-a.score).slice(0,3);
}
export function buildBrief(values) {
  return `AVE Consultancy — Project enquiry\n\nName: ${values.name || 'Not supplied'}\nOrganisation: ${values.organisation || 'Not supplied'}\nEmail: ${values.email || 'Not supplied'}\nEnquiry type: ${values.audience || 'Client enquiry'}\nService areas: ${values.services || 'To be discussed'}\nLocation: ${values.location || 'To confirm'}\nTimeframe: ${values.timeframe || 'To be discussed'}\n\nOutcome and requirements\n${values.requirement || 'To be discussed'}\n\nPlease advise on feasibility, the information required, proposed responsibilities and the basis for a quotation.\n`;
}
