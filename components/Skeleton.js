import React from "react";
import { Box, Skeleton } from "native-base";

const PieChartSkeleton = () => {
  return (
    <Box
      widthAndHeight={100}
      style={{
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#343A40", // Placeholder color
      }}
    >
      <Skeleton height={100} width={100} borderRadius={50} />
    </Box>
  );
};

export default PieChartSkeleton;
