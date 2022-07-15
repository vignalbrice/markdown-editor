import data from "../../mocks/data.json";

type MarkDown = {
  id: string;
  createdAt: Date;
  name: string;
  text: string;
};

type InitialState = {
  markdowns: MarkDown[];
  isMarkDownFullScreen: boolean;
  currentMd: MarkDown;
};

export const initialState = {
  markdowns: data as unknown as MarkDown[],
  isMarkDownFullScreen: false,
  currentMd: {
    id: "",
    createdAt: new Date(),
    name: "",
    text: "",
  },
} as InitialState;

export const name = "markdown";
