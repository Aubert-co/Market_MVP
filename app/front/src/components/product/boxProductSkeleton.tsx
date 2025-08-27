import styled,{keyframes}from "styled-components"
const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const Skeleton = styled.div`
  background: linear-gradient(
    90deg,
    #e0e0e0 25%,
    #f5f5f5 50%,
    #e0e0e0 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 4px;
`;

const SkeletonImg = styled(Skeleton)`
  width: 100%;
  height: 200px;
  border-radius: 8px;
  margin-bottom: 12px;
`;

const SkeletonText = styled(Skeleton)<{ $short?: "active"| "" }>`
  height: 16px;
  margin-bottom: 8px;
  width: ${({ $short }) => ($short==="active" ? "60%" : "100%")};
`;

type Props ={
  length:number,
  className:string
}
export const ProductSkeleton = ({length,className}:Props) => {
  return Array.from({length:length})
  .map((_,index)=>{
    return (
      <div key={index} className={className}>
        <SkeletonImg />
        <SkeletonText />
        <SkeletonText $short={"active"} />
      </div>
    );
  })
};