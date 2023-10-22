import { Card } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

const RecommendedCardSkeleton = () => {
  return (
    <Card className="p-4 w-[300px] h-[150px]">
      <div className="flex gap-4">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>
    </Card>
  );
};

const RecommendationsSkeleton = () => {
  const skeltons = Array.from({ length: 2 });

  return (
    <div className="mt-2 flex flex-wrap gap-4">
      {skeltons.map((_, index) => (
        <RecommendedCardSkeleton key={index} />
      ))}
    </div>
  );
};
export default RecommendationsSkeleton;
