const LoadingSkeleton = () => {
	return (
		<div className='bg-light-black border border-gray-200 border-opacity-30 rounded-lg flex flex-1 flex-col justify-between'>
			<div className='animate-pulse m-3'>
				<div className='flex justify-between mb-2'>
					<div className='h-2 w-1/2 bg-[#243b55] rounded' />
					<div className='h-2 w-1/4 bg-[#243b55] rounded' />
				</div>
				<div className='flex flex-1 justify-between items-center mb-2'>
					<div className='h-2 w-1/4 bg-[#243b55] rounded' />
					<div className='h-2 w-1/4 bg-[#243b55] rounded' />
				</div>
				<div className='flex justify-between items-center mb-2'>
					<div className='h-2 w-1/6 bg-[#243b55] rounded' />
					<div className='h-2 w-1/6 bg-[#243b55] rounded' />
				</div>
				<div className='h-2 bg-[#243b55] rounded mb-2' />
				<div className='h-2 w-2/3 bg-[#243b55] rounded mb-2' />
				<div className='h-2 w-1/3 bg-[#243b55] rounded mb-2' />
			</div>
		</div>
	);
};

export const LoadingSkeletonArray = () => {
	return (
		<>
			<LoadingSkeleton />
			<LoadingSkeleton />
			<LoadingSkeleton />
			<LoadingSkeleton />
			<LoadingSkeleton />
			<LoadingSkeleton />
			<LoadingSkeleton />
			<LoadingSkeleton />
		</>
	);
};

export default LoadingSkeleton;
