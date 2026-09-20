export interface GetKv {
  id: string
  number: number
  vidInKv: Vid[]
}

export interface Vid {
  id?: string
  vid_num: number
  coords: [number, number][] | [number, number][][]
}

export interface VidFull extends Vid {
  id: string
}

export interface UpdateKv {
  number: number
  vidInKv: Vid
}
