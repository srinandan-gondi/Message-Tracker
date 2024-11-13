import { Link } from "@nextui-org/link";
// import { Snippet } from "@nextui-org/snippet";
// import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

// import { siteConfig } from "@/config/site";
import { title } from "@/components/primitives";
// import { GithubIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default";
import {Button} from "@nextui-org/button";

export default function IndexPage() {

    const buttonClickHandler = () => {
        window.open("http://localhost:3000/auth/twitter", "_blank");
    }

    return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <span className={title()}>Login with X&nbsp;</span>
        </div>

        <div className="flex gap-3">
          {/*<Link*/}
          {/*  isExternal*/}
          {/*  className={buttonStyles({*/}
          {/*    color: "primary",*/}
          {/*    radius: "full",*/}
          {/*    variant: "shadow",*/}
          {/*  })}*/}
          {/*  href={"http://localhost:3000/auth/twitter"}*/}
          {/*>*/}
          {/*  Click Me!*/}
          {/*</Link>*/}

          <Button
              className={buttonStyles({
                  color: "primary",
                  radius: "full",
                  variant: "shadow",
              })}
              onClick={buttonClickHandler}
          >
              Click Me!
          </Button>

        </div>


      </section>
    </DefaultLayout>
  );
}
