import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { A11yModule } from "@angular/cdk/a11y";

type FeatureStatus = 'Live' | 'Soon';
type FeatureFilter = 'all' | 'live' | 'planned';
type FeatureCategory = 'all' | 'core' | 'management' | 'productivity' | 'platform';

type FeatureCard = {
  title: string;
  status: FeatureStatus;
  description: string;
  route: string;
  icon: string;
  tags: string[];
  category: Exclude<FeatureCategory, 'all'>;
};

type SideNavItem = {
  label: string;
  icon: string;
  route?: string;
  disabled?: boolean;
};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule,
    MatDividerModule,
    CommonModule,
    A11yModule
],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  readonly sideNavItems: SideNavItem[] = [
    { label: 'Dashboard', icon: 'home', route: '/' },
    { label: 'Employees', icon: 'group', route: '/employees' },
    { label: 'Todos', icon: 'check_box', route: '/todos' },
    { label: 'Reports', icon: 'bar_chart', disabled: true },
    { label: 'Authentication', icon: 'lock', disabled: true },
    { label: 'Settings', icon: 'settings', disabled: true },
    { label: 'Notes', icon: 'description', disabled: true },
  ];

  readonly features: FeatureCard[] = [
    {
      title: 'Employees',
      status: 'Live',
      description: 'Manage employee records with CRUD operations and search.',
      route: '/employees',
      icon: 'group',
      tags: ['Forms', 'Tables', 'API', 'Routing'],
      category: 'management',
    },
    {
      title: 'Todos',
      status: 'Live',
      description: 'Create, update, and track tasks with status management.',
      route: '/todos',
      icon: 'check_box',
      tags: ['Forms', 'API', 'State', 'Async'],
      category: 'productivity',
    },
    {
      title: 'Reports',
      status: 'Soon',
      description: 'Generate analytics and insights from your data.',
      route: '/',
      icon: 'bar_chart',
      tags: ['Tables', 'Charts', 'API', 'Routing'],
      category: 'core',
    },
    {
      title: 'Authentication',
      status: 'Soon',
      description: 'User registration, login, and role based access control.',
      route: '/',
      icon: 'lock',
      tags: ['Forms', 'API', 'State', 'Routing'],
      category: 'platform',
    },
    {
      title: 'Settings',
      status: 'Soon',
      description: 'Configure application settings and preferences.',
      route: '/',
      icon: 'settings',
      tags: ['Forms', 'State', 'API', 'Routing'],
      category: 'platform',
    },
    {
      title: 'Notes',
      status: 'Soon',
      description: 'Write and organize notes for your development journey.',
      route: '/',
      icon: 'description',
      tags: ['Forms', 'State', 'Async', 'Store'],
      category: 'productivity',
    },
  ];

  selectedFilter: FeatureFilter = 'all';
  selectedCategory: FeatureCategory = 'all';
  isMobileMenuOpen = false;

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  get liveCount(): number {
    return this.features.filter((feature) => feature.status === 'Live').length;
  }

  get plannedCount(): number {
    return this.features.filter((feature) => feature.status === 'Soon').length;
  }

  get visibleFeatures(): FeatureCard[] {
    return this.features.filter((feature) => {
      const matchesFilter =
        this.selectedFilter === 'all' ||
        (this.selectedFilter === 'live' && feature.status === 'Live') ||
        (this.selectedFilter === 'planned' && feature.status === 'Soon');

      const matchesCategory =
        this.selectedCategory === 'all' || feature.category === this.selectedCategory;

      return matchesFilter && matchesCategory;
    });
  }

  setFilter(filter: FeatureFilter): void {
    this.selectedFilter = filter;
  }

  trackByTitle(_: number, feature: FeatureCard): string {
    return feature.title;
  }
}
