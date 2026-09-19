export class CreateGeoVidDto {
  KVId: string
  vid_num: number
  coords: [number, number][]
}

export class CreateGeoKvDto {
  number: number
  vidInKv?: CreateGeoVidDto[]
}
