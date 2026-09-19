export interface GetKv {
  id: string
  number: number
  vidInKv: Vid[]
}

export interface Vid {
  vid_num: number
  coords: [number, number][] | [number, number][][]
}
export interface UpdateKv {
  number: number
  vidInKv: Vid
}
