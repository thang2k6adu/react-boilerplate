import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function WelcomeBanner() {
  return (
    <Card className="w-full rounded-md shadow-md bg-card">
      <CardContent className="p-6">
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-col justify-between w-full">
            <div className="flex flex-col gap-3 w-full">
              <p className="text-h6-regular text-muted-foreground">
                Welcome To
              </p>

              <div className="flex flex-col gap-0 w-fit">
                <h2 className="text-h5-bold text-gray-black">
                  Room Matching Area{' '}
                </h2>
                <p className="text-caption-lg-regular text-muted-foreground">
                  You can match with other partner to finish your task or join
                  public room to focus with others{' '}
                </p>
              </div>
            </div>
            <Button asChild>
              <button className="inline-block w-fit h-fit px-4 py-3 !text-caption-lg-regular text-white">
                Match Now!
              </button>
            </Button>
          </div>

          <img
            width={314}
            height={190}
            src="/icons/welcome-image.png"
            alt="Welcome"
          />
        </div>
      </CardContent>
    </Card>
  );
}
