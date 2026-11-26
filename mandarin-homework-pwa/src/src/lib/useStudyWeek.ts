'use client';
import {useState} from 'react';
import type {LearningGrade} from '@/data/sampleVocab';
import {getStudyWeeks,kindergartenReviewSets} from '@/data/studyCurriculum';
// A child's selected week follows them between the learning tabs in this session.
const selected=new Map<LearningGrade,number>();
export function useStudyWeek(grade:LearningGrade):[number,(week:number)=>void]{
 const [week,setWeek]=useState(()=>selected.get(grade)??1);
 function choose(next:number){
  if(!(getStudyWeeks(grade).some(w=>w.week===next)))return;
  selected.set(grade,next);setWeek(next);
 }
 return [week,choose];
}
