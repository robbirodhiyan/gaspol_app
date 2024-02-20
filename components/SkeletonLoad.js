import React from "react";
import { Box, Skeleton } from "native-base";

const SkeletonLoader = () => {
  return (
    <Box mr={5} ml={5} rounded={10} shadow={5} p={5} bgColor="#FFFFFF" mb={5}>
      <Skeleton height={16} width={180} mb={2} />
      <Skeleton height={6} width={120} mb={1} />
      <Skeleton height={6} width={120} mb={2} />
    </Box>
  );
};

export default SkeletonLoader;
