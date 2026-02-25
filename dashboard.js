/* ═══════════════════════════════════════════════════
   DASHBOARD — JavaScript
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  // ─── Sidebar Navigation ────────────────────────────
  const sidebarLinks = document.querySelectorAll('.sidebar-link');
  
  sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Remove active from all
      sidebarLinks.forEach(l => l.classList.remove('active'));
      // Add active to clicked
      link.classList.add('active');
    });
  });

  // ─── Notification Dismiss ──────────────────────────
  const dismissBtns = document.querySelectorAll('.notification-dismiss');
  
  dismissBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const notification = btn.closest('.notification-item');
      
      // Animate out
      notification.style.transform = 'translateX(20px)';
      notification.style.opacity = '0';
      
      setTimeout(() => {
        notification.style.height = notification.offsetHeight + 'px';
        notification.style.overflow = 'hidden';
        
        requestAnimationFrame(() => {
          notification.style.height = '0';
          notification.style.padding = '0';
          notification.style.margin = '0';
        });
        
        setTimeout(() => {
          notification.remove();
          updateNotificationBadge();
        }, 300);
      }, 200);
    });
  });

  // ─── Mark All as Read ──────────────────────────────
  const markAllReadBtn = document.querySelector('.mark-all-read');
  
  if (markAllReadBtn) {
    markAllReadBtn.addEventListener('click', () => {
      const unreadNotifications = document.querySelectorAll('.notification-item.unread');
      
      unreadNotifications.forEach(notification => {
        notification.classList.remove('unread');
      });
      
      updateNotificationBadge();
    });
  }

  // ─── Update Notification Badge ─────────────────────
  function updateNotificationBadge() {
    const badge = document.querySelector('.notification-badge');
    const unreadCount = document.querySelectorAll('.notification-item.unread').length;
    
    if (badge) {
      badge.textContent = unreadCount;
      
      if (unreadCount === 0) {
        badge.style.display = 'none';
      } else {
        badge.style.display = 'flex';
      }
    }
    
    // Update sidebar badge too
    const sidebarBadge = document.querySelector('.sidebar-link:nth-child(2) .sidebar-badge');
    if (sidebarBadge) {
      const totalCount = document.querySelectorAll('.notification-item').length;
      sidebarBadge.textContent = totalCount;
      
      if (totalCount === 0) {
        sidebarBadge.style.display = 'none';
      }
    }
  }

  // ─── Notification Bell Toggle ──────────────────────
  const notificationBell = document.getElementById('notificationBell');
  
  if (notificationBell) {
    notificationBell.addEventListener('click', () => {
      // Scroll to notifications panel smoothly
      const panel = document.querySelector('.notifications-panel');
      if (panel) {
        panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Add highlight effect
        panel.style.boxShadow = '0 0 0 2px var(--primary), var(--glass-shadow)';
        setTimeout(() => {
          panel.style.boxShadow = '';
        }, 2000);
      }
    });
  }

  // ─── Stats Card Hover Effect ───────────────────────
  const statCards = document.querySelectorAll('.stat-card');
  
  statCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const icon = card.querySelector('.stat-icon');
      if (icon) {
        icon.style.transform = 'scale(1.1)';
      }
    });
    
    card.addEventListener('mouseleave', () => {
      const icon = card.querySelector('.stat-icon');
      if (icon) {
        icon.style.transform = 'scale(1)';
      }
    });
  });

  // ─── Activity Items Animation ──────────────────────
  const activityItems = document.querySelectorAll('.activity-item');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const activityObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateX(0)';
        }, index * 100);
        activityObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  activityItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    activityObserver.observe(item);
  });

  // ─── Simulated Real-time Notification ──────────────
  function showNewNotification() {
    const notificationsList = document.querySelector('.notifications-list');
    
    if (!notificationsList) return;
    
    const newNotification = document.createElement('div');
    newNotification.className = 'notification-item unread';
    newNotification.innerHTML = `
      <div class="notification-icon info">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      </div>
      <div class="notification-content">
        <p class="notification-text"><strong>Nueva actividad</strong> Alguien ha guardado tu propiedad en favoritos.</p>
        <span class="notification-time">Ahora mismo</span>
      </div>
      <button class="notification-dismiss" aria-label="Descartar">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    `;
    
    // Style for animation
    newNotification.style.opacity = '0';
    newNotification.style.transform = 'translateY(-20px)';
    newNotification.style.transition = 'all 0.4s ease';
    
    // Insert at top
    notificationsList.insertBefore(newNotification, notificationsList.firstChild);
    
    // Animate in
    requestAnimationFrame(() => {
      newNotification.style.opacity = '1';
      newNotification.style.transform = 'translateY(0)';
    });
    
    // Add dismiss listener
    const dismissBtn = newNotification.querySelector('.notification-dismiss');
    dismissBtn.addEventListener('click', () => {
      newNotification.style.transform = 'translateX(20px)';
      newNotification.style.opacity = '0';
      
      setTimeout(() => {
        newNotification.remove();
        updateNotificationBadge();
      }, 300);
    });
    
    updateNotificationBadge();
  }

  // Demo: Show a new notification after 10 seconds
  // setTimeout(showNewNotification, 10000);

  console.log('Dashboard initialized');
});
