import * as React from "react";
import { faGithub, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";

import IconButton from "../components/IconButton";

export default function HomePage(): JSX.Element {
    return (
        <React.Fragment>
            Where to find me
            <div>
                <IconButton icon={faGithub} />
                <IconButton icon={faLinkedin} />
                <IconButton icon={faTwitter} />
            </div>
        </React.Fragment>
    );
}
