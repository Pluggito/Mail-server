import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";


export default function HomePage() {
  return <div>

    {/*----------------- Email List ----------------- */}
    <div>
      <h1>My Email List</h1>
      <Separator className="my-4"/>
      <p>Here you can see all your emails</p>

      {/*----------Emails--------*/}
      <div className="grid col-auto">
        <Card>
          <CardTitle className="flex items-center gap-4">
            <Avatar>
              <AvatarFallback>
                TN
              </AvatarFallback>
            </Avatar>
            <CardDescription>
              <p>Email Body</p>
            </CardDescription>
          </CardTitle>
        </Card>
        <Card>
          <CardTitle>
            <h2>Email Subject</h2>
            <CardDescription>
              <p>Email Body</p>
            </CardDescription>
          </CardTitle>
        </Card>
        <Card>
          <CardTitle>
            <h2>Email Subject</h2>
            <CardDescription>
              <p>Email Body</p>
            </CardDescription>
          </CardTitle>
        </Card>
        <Card>
          <CardTitle>
            <h2>Email Subject</h2>
            <CardDescription>
              <p>Email Body</p>
            </CardDescription>
          </CardTitle>
        </Card>        
      </div>
    </div>
  </div>;
}