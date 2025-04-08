import { Request, Response } from 'express';
import { authService } from './auth.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import config from '../../config';

const register = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.register(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    status: true,
    message: 'User registered successfully',
    data: result,
  });
});
const login = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.login(req.body);
  const { refreshToken, token, verifyUser } = result;
  res.cookie('refresh_token', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    status: true,
    message: 'User login successfully',
    data: { token, verifyUser },
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refresh_token } = req.cookies;
  const result = await authService.refreshToken(refresh_token);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    status: true,
    message: ' Refresh token is get successfully',
    data: result,
  });
});

export const AuthController = {
  register,
  login,
  refreshToken,
};
