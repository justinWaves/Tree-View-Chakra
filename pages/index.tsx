import React, { useState } from "react";
import dynamic from "next/dynamic";
import { RawNodeDatum } from "react-d3-tree/lib/types/common";
import { Box } from "@chakra-ui/layout";
import { AddFamilyMemberModal } from "../components/AddFamilyMemberModal";

const Tree = dynamic(() => import("react-d3-tree"), {
  ssr: false,
});

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const [tree, setTree] = useState<RawNodeDatum | RawNodeDatum[]>({
    name: "Root",
    children: [],
  });
  const [isOpen, setIsOpen] = useState(true);
  const close = () => setIsOpen(false);

  const handleSubmit = (name: string) => {};

  return (
    <Box h="100vh" w="100vw">
      <Tree data={tree} />
      <AddFamilyMemberModal
        isOpen={isOpen}
        onClose={close}
        onSubmit={handleSubmit}
      />
    </Box>
  );
};

export default Home;
