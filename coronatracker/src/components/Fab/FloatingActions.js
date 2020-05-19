import React, { useState } from "react";
import InfoFab from "./InfoFab";
import ShareFab from "./ShareFab";
import ShareDialog from "./ShareDialog";
import InfoDialog from "./InfoDialog";

export default function FloatingActions() {
  const [infoOpen, setInfo] = useState(false);
  const [shareOpen, setShare] = useState(false);

  const handleInfoOpen = () => setInfo(true);

  const handleShareOpen = () => setShare(true);

  const handleInfoClose = () => setInfo(false);

  const handleShareClose = () => setShare(false);

  return (
    <React.Fragment>
      <ShareFab onClick={handleShareOpen} />
      <InfoFab onClick={handleInfoOpen} />
      <ShareDialog open={shareOpen} onClose={handleShareClose} />
      <InfoDialog open={infoOpen} onClose={handleInfoClose} />
    </React.Fragment>
  );
}
