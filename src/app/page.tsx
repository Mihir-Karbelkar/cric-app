import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@cric-app/components/ui/card';
import Link from '@cric-app/components/ui/link';
import { Fragment } from 'react';

export default function Home() {
  return (
    <div className="mt-4 p-4 relative">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to the Cricket App</CardTitle>
          <CardDescription>
            <p className="text-lg">
              Explore the world of cricket with the feature-rich Next.js
              application built with React and Tailwind CSS.
            </p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold  mb-2 lg:mb-4">
              App Features
            </h2>
            <ul className="list-disc list-inside  pl-2 lg:pl-4">
              <li>
                <span className="font-bold"> Mobile-First Design:</span> The app
                is designed to provide a seamless experience on both mobile and
                desktop devices.
              </li>
              <li>
                <span className="font-bold"> Dark Mode Support:</span> Enjoy
                reading about your favorite cricketers in a dark or light theme.
              </li>
              <li>
                <span className="font-bold"> Error Handling:</span> The app has
                implemented basic error handling to ensure a smooth user
                experience.
              </li>
            </ul>
          </div>

          <div className="mb-8">
            <Fragment>
              <h2 className="text-2xl font-semibold  mb-2 lg:mb-4">
                Getting Started (For Local)
              </h2>
              <p className="">
                <span className="font-bold">
                  Follow these simple steps to start using the app
                </span>
              </p>
              <ol className="list-decimal list-inside  pl-2 lg:pl-4">
                <li>
                  Install the necessary dependencies using your preferred
                  <span className="font-bold"> package manager</span> `pnpm`,
                  `yarn`, or `npm`.
                </li>
                <li>
                  Build the app using the respective command for your package
                  manager.
                </li>
                <li>
                  Start the development server and access the app at{' '}
                  <Link href={'/cricketers'}>/cricketers</Link>
                </li>
              </ol>
            </Fragment>
          </div>
          <p className="">
            If you have any questions or run into issues, don&#39;t hesitate to
            reach out to me.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
