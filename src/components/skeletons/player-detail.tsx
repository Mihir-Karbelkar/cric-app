import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '../ui/card';
import { Skeleton } from '../ui/skeleton';

const PlayerDetailSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="mb-4">
          <Skeleton className="h-6 w-[150px] rounded-full" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-4 w-full rounded-full mb-4" />
          <Skeleton className="h-4 w-[75%] rounded-full mb-4" />
          <Skeleton className="h-4 w-[50%] rounded-full " />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-4">
          <div>
            <div className="text-xl font-bold">Type</div>
            <div>
              <Skeleton className="h-2 w-16 rounded-full" />{' '}
            </div>
          </div>
          <div>
            <div className="text-xl font-bold">Born</div>
            <div>
              <Skeleton className="h-2 w-16 rounded-full" />{' '}
            </div>
          </div>
          <div>
            <div className="text-xl font-bold">Points</div>
            <div>
              <Skeleton className="h-2 w-16 rounded-full" />{' '}
            </div>
          </div>
          <div></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlayerDetailSkeleton;
