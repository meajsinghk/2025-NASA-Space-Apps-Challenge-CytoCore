export type FundingOpportunity = {
  id: number;
  title: string;
  agency: string;
  opportunityNumber: string;
  description: string;
  postedDate: string;
  dueDate: string;
  link: string;
};

export const fundingOpportunities: FundingOpportunity[] = [
    {
        id: 1,
        title: 'Research Opportunities in Space Biology',
        agency: 'NASA',
        opportunityNumber: 'NNH23ZDA001N-BIOLOGY',
        description: 'This solicitation supports fundamental and applied research to advance our understanding of how biological systems respond to the space environment.',
        postedDate: '2023-10-15',
        dueDate: '2024-09-30',
        link: 'https://www.nasa.gov/research'
    },
    {
        id: 2,
        title: 'ESA Space Biology Research Program',
        agency: 'ESA',
        opportunityNumber: 'ESA-SCI-2024-01',
        description: 'The European Space Agency seeks proposals for experiments to be conducted on the International Space Station (ISS) and other microgravity platforms.',
        postedDate: '2024-01-20',
        dueDate: '2024-11-15',
        link: 'https://www.esa.int/Science_Exploration/Human_and_Robotic_Exploration/Research/Research_Announcements'
    },
    {
        id: 3,
        title: 'JAXA "Kibo" Utilization for Life Science',
        agency: 'JAXA',
        opportunityNumber: 'JAXA-KIBO-LS-2024',
        description: 'Call for proposals utilizing the Japanese Experiment Module "Kibo" on the ISS for life science and space medicine research.',
        postedDate: '2024-02-01',
        dueDate: '2024-10-25',
        link: 'https://humans-in-space.jaxa.jp/en/biz-lab/invitation/'
    },
    {
        id: 4,
        title: 'TRISH Postdoctoral Fellowship Program',
        agency: 'TRISH (NASA Partner)',
        opportunityNumber: 'TRISH-POSTDOC-2024',
        description: 'The Translational Research Institute for Space Health (TRISH) funds postdoctoral fellows to conduct research on innovative approaches to mitigate space health risks.',
        postedDate: '2023-11-01',
        dueDate: '2024-08-15',
        link: 'https://www.bcm.edu/academic-programs/translational-research-institute-for-space-health/funding-opportunities'
    },
     {
        id: 5,
        title: 'Canadian Space Agency Life Sciences Funding',
        agency: 'CSA',
        opportunityNumber: 'CSA-LS-2024-A',
        description: 'Funding for Canadian universities and research institutions to conduct space life science research relevant to future human space exploration missions.',
        postedDate: '2024-03-10',
        dueDate: '2024-12-10',
        link: 'https://www.asc-csa.gc.ca/eng/funding-opportunities/'
    },
    {
        id: 6,
        title: 'DLR Space Biology and Medicine Grants',
        agency: 'DLR',
        opportunityNumber: 'DLR-SBM-24-DE',
        description: 'Grants for German-based research teams focusing on human physiology, biology, and medicine in the context of spaceflight.',
        postedDate: '2024-04-05',
        dueDate: '2025-01-20',
        link: 'https://www.dlr.de/en/funding-and-careers'
    },
];
