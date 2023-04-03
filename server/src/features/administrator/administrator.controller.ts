import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AdministratorService } from './administrator.service';

@Controller('/administrator')
export class AdministratorController {
  constructor(private readonly administratorService: AdministratorService) {}
}
