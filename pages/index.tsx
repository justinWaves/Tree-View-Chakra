import React, { useState } from "react";
import dynamic from "next/dynamic";
import { RawNodeDatum, TreeNodeDatum } from "react-d3-tree/lib/types/common";
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
  const [node, setNode] = useState<undefined | TreeNodeDatum>(undefined);
  const close = () => setNode(undefined);

  const handleSubmit = (name: string) => {
    const newTree = bfs(node.name, tree, name);

    console.log(name, newTree);

    if (newTree) {
      setTree(newTree);
    }
  };

  return (
    <Box h="100vh" w="100vw">
      <Tree
        data={tree}
        onNodeClick={(datum) => setNode(datum)}
        translate={{ x: 200, y: 200 }}
      />
      <AddFamilyMemberModal
        isOpen={Boolean(node)}
        onClose={close}
        onSubmit={handleSubmit}
      />
    </Box>
  );
};

function bfs(
  name: string,
  tree: RawNodeDatum | RawNodeDatum[],
  newNodeName: string
) {
  const queue: RawNodeDatum[] = [];

  queue.unshift(tree as RawNodeDatum);

  while (queue.length > 0) {
    const curNode = queue.pop();

    if (curNode.name === name) {
      curNode.children.push({
        name: newNodeName,
        children: [],
      });
      return { ...tree };
    }

    const len = curNode.children.length;

    for (let i = 0; i < len; i++) {
      queue.unshift(curNode.children[i]);
    }
  }
}

export default Home;
