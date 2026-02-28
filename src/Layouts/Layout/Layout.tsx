import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Box, Avatar, Menu, MenuItem, Typography, Divider, IconButton } from '@mui/material';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const initials = [currentUser?.first_name?.[0], currentUser?.last_name?.[0]]
    .filter(Boolean)
    .join('')
    .toUpperCase() || '?';

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleClose();
    await supabase.auth.signOut();
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Box sx={{ position: 'absolute', top: 16, right: 16, zIndex: 50 }}>
        <IconButton onClick={handleOpen} size="small" sx={{ p: 0 }}>
          <Avatar sx={{ width: 32, height: 32, fontSize: 14, bgcolor: '#6c63ff', cursor: 'pointer' }}>
            {initials}
          </Avatar>
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {currentUser && (
            <Box sx={{ px: 2, py: 1 }}>
              <Typography variant="body2" fontWeight={600}>
                {currentUser.first_name} {currentUser.last_name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {currentUser.email}
              </Typography>
            </Box>
          )}
          <Divider />
          <MenuItem onClick={handleLogout}>Sign out</MenuItem>
        </Menu>
      </Box>
      {children}
    </div>
  );
}
