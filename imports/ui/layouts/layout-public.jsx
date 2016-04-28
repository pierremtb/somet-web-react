import React from 'react';

export function PublicLayout({ children }) {
  return (
    <div>
      {children}
    </div>
  );
}

PublicLayout.propTypes = {
  children: React.PropTypes.element,
};
