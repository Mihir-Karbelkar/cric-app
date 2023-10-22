import { Card } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

const RecommendedCardSkeleton = () => {
  return (
    <Card className="p-4">
      <div className="flex gap-4 items-center">
        <div>
          <Skeleton className="h-12 w-12 rounded-full" />
        </div>
        <div className="space-y-2 w-full">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[75%]" />
        </div>
      </div>
    </Card>
  );
};

const RecommendationsSkeleton = () => {
  const skeltons = Array.from({ length: 2 });

  return (
    <div className="mt-2 gap-4 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
      {skeltons.map((_, index) => (
        <RecommendedCardSkeleton key={index} />
      ))}
    </div>
  );
};
export default RecommendationsSkeleton;
