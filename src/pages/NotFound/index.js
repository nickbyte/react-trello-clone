let notFoundIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-40">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
export default function NotFound() {
    return(<div className="h-screen w-screen flex items-center">
	<div className="container flex flex-col md:flex-row items-center justify-center px-5 text-white">
   		<div className="max-w-md">
      		<div className="text-5xl font-dark font-bold">404</div>
            <p
              className="text-2xl md:text-3xl font-light leading-normal"
            >Sorry we couldn't find this page. </p>
          <p className="mb-8">You may have mistyped the address or the page may have moved.</p>
          
          <a href="/" className="px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-green-600 active:bg-green-600 hover:bg-green-700">Back to homepage</a>
    </div>
      <div className="max-w-lg">
      {notFoundIcon}
    </div>
    
  </div>
</div>);
}