const BASE_POINTS = 50;
const GROWTH_RATE = 0.15;

type Props = {
  explorePoints: number;
  level: number;
};

const calculateCumulativePoints = (level: number): number => {
  if (level <= 1) return 0;
  return (
    BASE_POINTS * Math.exp(GROWTH_RATE * (level - 2)) +
    calculateCumulativePoints(level - 1)
  );
};

const calculateNextLevelPoints = (level: number): number => {
  const currentCumulativePoints = calculateCumulativePoints(level);
  const nextCumulativePoints = calculateCumulativePoints(level + 1);
  return nextCumulativePoints - currentCumulativePoints;
};

const calculateProgressPercentage = (
  explorePoints: number,
  level: number
): number => {
  const currentLevelPoints = calculateNextLevelPoints(level);
  const nextLevelPoints = calculateNextLevelPoints(level + 1);

  const progress = explorePoints - currentLevelPoints;

  return Math.min((progress / nextLevelPoints) * 100, 100);
};

export const LevelProgressBar = ({ explorePoints, level }: Props) => {
  return (
    <>
      <div className="flex items-center justify-between w-full">
        <p className="text-sm">
          LV<span>{level}</span>
        </p>
        <p className="text-xs">
          次のレベルまで
          <span>
            {Math.max(
              calculateCumulativePoints(level + 1) - explorePoints,
              0
            ).toFixed(0)}
          </span>
          EXP
        </p>
      </div>
      <div className="relative">
        <div className="w-full h-2 bg-gray-200 rounded-full" />
        <div
          className="h-2 bg-main rounded-full absolute top-0 left-0"
          style={{
            width: `${calculateProgressPercentage(explorePoints, level)}%`,
          }}
        />
      </div>
    </>
  );
};
