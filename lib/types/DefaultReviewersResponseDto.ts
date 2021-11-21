import type { UserResponseDto } from "./UserResponseDto.ts";

export type DefaultReviewersResponseDto = {
  pagelen: number;
  values: Array<UserResponseDto>;
  page: number;
  size: number;
};
