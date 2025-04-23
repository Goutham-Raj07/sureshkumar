import React from 'react';

/**
 * Renders a simple, clean background for the light theme.
 * Currently uses a very subtle diagonal linear gradient, but can be simplified
 * further to a solid color if preferred.
 */
const Background = () => {
	return (
		<div 
			className="fixed inset-0 -z-50 pointer-events-none" 
			aria-hidden="true"
		>
			{/* Option 1: Very Subtle Gradient Background */}
			<div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50"></div>

			{/* Option 2: Solid Color Background (Uncomment this and comment Option 1 if preferred) */}
			{/* <div className="absolute inset-0 bg-gray-50"></div> */}

			{/* Option 3: Plain White Background (Uncomment this and comment Option 1/2 if preferred) */}
			{/* <div className="absolute inset-0 bg-white"></div> */}

			{/* You can add other non-grid subtle effects here if needed, like very faint large blurs */}
			{/* Example: */}
			{/* <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-gradient-to-br from-indigo-50 to-purple-50 blur-[80px] opacity-30"></div> */}
			{/* <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-gradient-to-br from-purple-50 to-indigo-50 blur-[80px] opacity-30"></div> */}
		</div>
	);
};

export default Background;

