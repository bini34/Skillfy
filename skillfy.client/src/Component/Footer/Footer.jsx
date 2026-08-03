const LINKS = [
  {
    heading: 'Company',
    items: ['About', 'Careers', 'Press', 'Blog', 'Affiliates'],
  },
  {
    heading: 'Community',
    items: ['Go Premium', 'Refer a Friend', 'Support', 'Guidelines'],
  },
  {
    heading: 'Teaching',
    items: ['Become an Instructor', 'Teaching Center', 'Teaching Guide', 'Handbook'],
  },
  {
    heading: 'Support',
    items: ['Help', 'System Requirements', 'Accessibility'],
  },
];

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="page-container py-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {LINKS.map(({ heading, items }) => (
            <div key={heading}>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">{heading}</h4>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 border-t border-gray-700 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xl font-bold text-white">Skillfy</p>
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Skillfy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
