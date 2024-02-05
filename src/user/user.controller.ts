import { CloudinaryService } from './../cloudinary/cloudinary.service';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UseGuards, Query, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags("user")
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private cloudinaryService: CloudinaryService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<string> {
    console.log(createUserDto);
    return this.userService.create(createUserDto);
  }

  @ApiParam({ name: "page", required: false, description: "page :" })
  @ApiBearerAuth()
  @ApiParam({ name: "size", required: false })
  @ApiQuery({ name: "fill", required: false })
  @UseGuards(AuthGuard("jwt"))
  @Get("/:page/:size")
  findAll(@Param("page") page, @Param("size") size, @Query("fill") fill, @Req() req): Promise<any> {
    console.log(req.user);
    let numPage = Number(page);
    let numSize = Number(size);
    let skip = (numPage - 1) * numSize;

    return this.userService.findAll(skip, numSize, fill);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Post('/upload')
  @UseInterceptors(FileInterceptor("file", {
    storage: diskStorage({
      destination: process.cwd() + "/public/img",
      filename: (req, file, cb) => {
        // console.log(file);
        cb(null, new Date().getTime() + `${file.originalname}`);
      }
    })
  }))
  upload(@UploadedFile() file) {
    console.log(file);
    return file;
  }

  @Post("/upload-cloud")
  @UseInterceptors(FileInterceptor("file", { limits: { fileSize: 1024 * 1024 * 20 } }))
  uploadCloud(@UploadedFile("file") file: Express.Multer.File) {
    return this.cloudinaryService.uploadImage(file);
  }
}
