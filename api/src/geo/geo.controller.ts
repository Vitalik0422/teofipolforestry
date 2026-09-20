import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { GeoService } from './geo.service.js'
import { CreateGeoKvDto } from './dto/create-geo.dto.js'
import { UpdateGeoDto } from './dto/update-geo.dto.js'

@Controller('map')
export class GeoController {
  constructor(private readonly geoService: GeoService) {}

  @Post('kv')
  create(@Body() createGeoDto: CreateGeoKvDto) {
    return this.geoService.createKV(createGeoDto)
  }

  @Get('kv')
  findAll() {
    return this.geoService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.geoService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGeoDto: UpdateGeoDto) {
    return this.geoService.update(id, updateGeoDto)
  }

  @Delete('vid/:id')
  remove(@Param('id') id: string) {
    console.log('click')
    return this.geoService.removeVid(id)
  }
}
