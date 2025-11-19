// ConversationSidebar.tsx
"use client";

import { useChat } from './ChatProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Plus, 
  MessageSquare, 
  Trash2, 
  Pin, 
  PinOff, 
  Copy,
  MoreVertical,
  Archive,
  LayoutDashboard,
  BarChart3,
  Settings,
  GraduationCap,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Badge } from '@/components/ui/badge';

// Items de navigation
const navigationItems = [

];

const bottomNavigationItems = [
  { href: '/learn/dashboard', icon: LayoutDashboard, label: 'Tableau de bord' },
  { href: '/learn/chat', icon: MessageSquare, label: 'Assistant IA', count: 3 },
  { href: '/learn/progress', icon: BarChart3, label: 'Progression' },
  { href: '/learn/settings', icon: Settings, label: 'Paramètres' },
];

export const ConversationSidebar = () => {
  const { 
    conversations, 
    currentConversation, 
    setCurrentConversation, 
    createNewConversation, 
    deleteConversation,
    renameConversation,
    togglePinConversation,
    searchTerm,
    setSearchTerm,
    duplicateConversation,
    clearAllConversations,
    isSidebarOpen,
    toggleSidebar
  } = useChat();

  const pathname = usePathname();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');

  const filteredConversations = conversations.filter(conv =>
    conv.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pinnedConversations = filteredConversations.filter(conv => conv.isPinned);
  const unpinnedConversations = filteredConversations.filter(conv => !conv.isPinned);

  const handleRename = (id: string) => {
    if (editTitle.trim()) {
      renameConversation(id, editTitle.trim());
    }
    setEditingId(null);
    setEditTitle('');
  };

  const handleStartEdit = (conv: any) => {
    setEditingId(conv.id);
    setEditTitle(conv.title);
  };

  // Rendu des liens de navigation
  const renderNavLink = (item: any) => {
    const isActive = pathname === item.href;
    const linkContent = (
      <>
        <item.icon className={cn("h-5 w-5 shrink-0", isActive ? "text-indigo-600" : "text-slate-500 group-hover:text-indigo-600")} />
        <span className="text-sm font-medium ml-3">
          {item.label}
        </span>
        {item.count && (
          <Badge variant="secondary" className="ml-auto bg-indigo-100 text-indigo-600">{item.count}</Badge>
        )}
      </>
    );

    const linkClasses = cn(
      "flex items-center p-3 rounded-lg transition-colors group w-full",
      isActive 
        ? "bg-indigo-50 text-indigo-600" 
        : "text-slate-700 hover:bg-slate-100"
    );

    return (
      <Link 
        key={item.href}
        href={item.href} 
        className={linkClasses}
      >
        {linkContent}
      </Link>
    );
  };

  // Version réduite de la sidebar
  if (!isSidebarOpen) {
    return (
      <div className="w-16 bg-white border-r border-slate-200 flex flex-col h-full">
        {/* Header compact */}
        <div className="flex items-center justify-center h-16 border-b border-slate-200">
          <GraduationCap className='h-6 w-6 text-indigo-600' />
        </div>

        {/* Navigation compacte */}
        <div className="flex-1 py-4 space-y-2">
          {navigationItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "w-12 h-12 mx-auto",
                  pathname === item.href ? "bg-indigo-50 text-indigo-600" : "text-slate-500"
                )}
              >
                <item.icon className="h-5 w-5" />
              </Button>
            </Link>
          ))}
        </div>

        {/* Bouton pour rouvrir et paramètres */}
        <div className="mt-auto space-y-2 p-2">
          <Link href="/learn/settings">
            <Button
              variant="ghost"
              size="icon"
              className="w-12 h-12 mx-auto text-slate-500"
            >
              <Settings className="h-5 w-5" />
            </Button>
          </Link>
          <Button 
            onClick={toggleSidebar}
            variant="ghost" 
            size="icon"
            className="w-12 h-12 mx-auto text-slate-500 hover:text-indigo-600"
          >
            <PanelLeftOpen className="h-5 w-5" />
          </Button>
        </div>
      </div>
    );
  }

  // Version complète de la sidebar
  return (
    <div className="w-80 bg-white border-r border-slate-200 flex flex-col h-full">
      {/* Header avec logo, nom et bouton de fermeture */}
      {/* <div className="flex items-center justify-between h-16 px-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <GraduationCap className='h-8 w-8 text-indigo-600' />
          <div>
            <h1 className="text-lg font-semibold text-slate-900">MediLearn</h1>
            <p className="text-xs text-slate-500">Espace Apprenant</p>
          </div>
        </div>
        <Button 
          onClick={toggleSidebar}
          variant="ghost" 
          size="icon"
          className="h-8 w-8 text-slate-500 hover:text-slate-700"
        >
          <PanelLeftClose className="h-4 w-4" />
        </Button>
      </div> */}

      {/* Navigation principale */}
      <div className="p-4 border-b border-slate-200">
        <nav className="space-y-1">
          {navigationItems.map(renderNavLink)}
        </nav>
      </div>

      {/* Section des conversations */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* En-tête des conversations avec recherche */}
        <div className="p-4 border-b border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold text-slate-900">Consultations</h2>
            <Button 
              onClick={createNewConversation}
              size="sm"
              className="bg-indigo-600 hover:bg-indigo-700 h-8"
            >
              <Plus className="h-3 w-3 mr-1" />
              Nouvelle
            </Button>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-3 w-3" />
            <Input
              placeholder="Rechercher une consultation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 h-8 text-sm bg-slate-50 border-slate-200 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Liste des conversations */}
        <div className="flex-1 overflow-y-auto">
          {/* Conversations épinglées */}
          {pinnedConversations.length > 0 && (
            <div className="p-3">
              <div className="px-2 py-1 text-xs font-medium text-slate-500 flex items-center mb-2">
                <Pin className="h-3 w-3 mr-1" />
                Épinglées
              </div>
              <div className="space-y-1">
                {pinnedConversations.map((conversation) => (
                  <ConversationItem
                    key={conversation.id}
                    conversation={conversation}
                    isActive={currentConversation?.id === conversation.id}
                    isEditing={editingId === conversation.id}
                    editTitle={editTitle}
                    onSelect={() => setCurrentConversation(conversation)}
                    onStartEdit={() => handleStartEdit(conversation)}
                    onRename={() => handleRename(conversation.id)}
                    onEditTitleChange={setEditTitle}
                    onCancelEdit={() => setEditingId(null)}
                    onDelete={() => deleteConversation(conversation.id)}
                    onTogglePin={() => togglePinConversation(conversation.id)}
                    onDuplicate={() => duplicateConversation(conversation.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Conversations normales */}
          {unpinnedConversations.length > 0 && (
            <div className="p-3">
              {pinnedConversations.length > 0 && (
                <div className="px-2 py-1 text-xs font-medium text-slate-500 mb-2">
                  Toutes les consultations
                </div>
              )}
              <div className="space-y-1">
                {unpinnedConversations.map((conversation) => (
                  <ConversationItem
                    key={conversation.id}
                    conversation={conversation}
                    isActive={currentConversation?.id === conversation.id}
                    isEditing={editingId === conversation.id}
                    editTitle={editTitle}
                    onSelect={() => setCurrentConversation(conversation)}
                    onStartEdit={() => handleStartEdit(conversation)}
                    onRename={() => handleRename(conversation.id)}
                    onEditTitleChange={setEditTitle}
                    onCancelEdit={() => setEditingId(null)}
                    onDelete={() => deleteConversation(conversation.id)}
                    onTogglePin={() => togglePinConversation(conversation.id)}
                    onDuplicate={() => duplicateConversation(conversation.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* État vide */}
          {filteredConversations.length === 0 && (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <MessageSquare className="h-10 w-10 text-slate-300 mb-3" />
              <p className="text-slate-500 text-sm mb-3">
                {searchTerm ? 'Aucune conversation trouvée' : 'Aucune conversation'}
              </p>
              {!searchTerm && (
                <Button 
                  onClick={createNewConversation}
                  variant="outline" 
                  size="sm"
                  className="mt-2"
                >
                  Commencer une consultation
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Pied de page avec paramètres et actions */}
      <div className="mt-auto border-t border-slate-200">
        {/* Paramètres */}
        <div className="p-3">
          {bottomNavigationItems.map(renderNavLink)}
        </div>

        {/* Actions globales */}
        {conversations.length > 2 && (
          <div className="p-3 border-t border-slate-200">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="w-full justify-center h-8">
                  <MoreVertical className="h-3 w-3 mr-1" />
                  Actions
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuItem onClick={clearAllConversations}>
                  <Trash2 className="h-3 w-3 mr-2" />
                  Tout supprimer
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </div>
  );
};

// Composant ConversationItem (identique à la version précédente)
const ConversationItem = ({ 
  conversation, 
  isActive, 
  isEditing, 
  editTitle,
  onSelect, 
  onStartEdit, 
  onRename, 
  onEditTitleChange,
  onCancelEdit,
  onDelete, 
  onTogglePin, 
  onDuplicate 
}: any) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onRename();
    } else if (e.key === 'Escape') {
      onCancelEdit();
    }
  };

  return (
    <div
      className={cn(
        "group relative flex items-center p-2 rounded-lg cursor-pointer transition-colors",
        isActive 
          ? "bg-indigo-50 border border-indigo-200" 
          : "hover:bg-slate-50 border border-transparent hover:border-slate-200"
      )}
      onClick={!isEditing ? onSelect : undefined}
    >
      <MessageSquare className={cn(
        "h-4 w-4 mr-2 flex-shrink-0",
        isActive ? "text-indigo-600" : "text-slate-400"
      )} />
      
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <Input
            value={editTitle}
            onChange={(e) => onEditTitleChange(e.target.value)}
            onKeyPress={handleKeyPress}
            onBlur={onRename}
            autoFocus
            className="h-6 text-sm border-slate-300 focus:border-indigo-500"
          />
        ) : (
          <>
            <div className="text-sm font-medium text-slate-900 truncate leading-tight">
              {conversation.title}
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              {formatDistanceToNow(conversation.updatedAt, { 
                addSuffix: true,
                locale: fr 
              })}
            </div>
          </>
        )}
      </div>

      {/* Actions au hover */}
      <div className={cn(
        "flex items-center space-x-0.5 ml-1",
        isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
      )}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-5 w-5 hover:bg-slate-200"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreVertical className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onTogglePin(); }}>
              {conversation.isPinned ? (
                <>
                  <PinOff className="h-3 w-3 mr-2" />
                  Désépingler
                </>
              ) : (
                <>
                  <Pin className="h-3 w-3 mr-2" />
                  Épingler
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onStartEdit(); }}>
              <Archive className="h-3 w-3 mr-2" />
              Renommer
            </DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onDuplicate(); }}>
              <Copy className="h-3 w-3 mr-2" />
              Dupliquer
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={(e) => { e.stopPropagation(); onDelete(); }} 
              className="text-red-600 focus:text-red-700"
            >
              <Trash2 className="h-3 w-3 mr-2" />
              Supprimer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};