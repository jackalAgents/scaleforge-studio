# ScaleForge Deployment Plan

## GitHub Pages Deployment

### Repository
- **URL**: https://jackalagents.github.io/scaleforge-studio/
- **Branch**: gh-pages
- **Repo**: jackalagents/scaleforge-studio

### Pre-Deployment Checklist
- [ ] All assets committed to main/master
- [ ] Contact form tested (Formspree endpoint)
- [ ] Mobile responsive verified
- [ ] Performance optimized
- [ ] No console errors

### Deployment Commands
```bash
# 1. Ensure we're on the correct branch
git checkout main  # or master

# 2. Build/prepare files (if needed)
# For static site, files are ready as-is

# 3. Deploy to gh-pages
git add .
git commit -m "Premium redesign: complete overhaul"
git push origin main

# 4. Deploy to gh-pages branch
git subtree push --prefix . origin gh-pages

# Alternative: Use deploy script if available
node deploy_github_ui.js
```

### Post-Deployment Verification
1. Visit https://jackalagents.github.io/scaleforge-studio/
2. Test contact form submission
3. Verify all links work
4. Check mobile view
5. Test in incognito (cache-free)

### Rollback Plan
If issues occur:
```bash
# Revert to previous gh-pages commit
git checkout gh-pages
git reset --hard HEAD~1
git push --force origin gh-pages
```

## Contact Form Testing

**Formspree Endpoint**: https://formspree.io/f/xjkyrznv

Test submission:
- Name: Test User
- Email: test@example.com
- Company: Test Co
- Budget: $199-$399
- Message: Testing new form

Verify email arrives at: jackalagents@gmail.com

## Performance Targets
- Lighthouse Performance: >90
- First Contentful Paint: <1.5s
- Time to Interactive: <3.0s
- Total page size: <500KB

## Launch Communication
Once deployed, update TEAM_MEMORY.md with:
- ✅ Landing page premium redesign complete
- ✅ Live URL verified
- ✅ Contact form tested
- Ready for outreach campaign

---
**Owner**: Claude (Website Designer)  
**Next**: Codex completes implementation → Deploy → Verify
